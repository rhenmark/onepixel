import { client } from "@/config/contentful/contentful-conf";
import { db } from "@/config/firebase/firebase-conf";
import {
  setProductCategories,
  setProductList,
} from "@/lib/duxs/feature/product/product";
import { RootState } from "@/lib/duxs/store";
import { getDocs, collection, writeBatch, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetCategories = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.products.productCategories
  );

  const fetchItems = async (force?: boolean) => {
    if (!categories.length || force) {
      try {
        const querySnapshot = await getDocs(collection(db, "category"));
        const res = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(res);
        setLoading(false);
        dispatch(setProductCategories(res));
      } catch {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const refetch = () => {
    fetchItems(true);
  };

  return {
    loading,
    data,
    refetch,
  };
};

export const useAddCategories = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<null | string>();
  const { refetch } = useGetCategories();

  const doAddCategory = async (categories: string[], cb: () => void) => {
    setLoading(true);

    const batch = writeBatch(db); // Initialize batch write
    const usersRef = collection(db, "category"); // Replace "users" with your collection

    // Iterate through the data array and add each one to the batch
    categories
      .map((item) => ({ name: item, isActive: true }))
      .forEach((data) => {
        const newDocRef = doc(usersRef); // Auto-generate document ID
        batch.set(newDocRef, data); // Add each document to the batch
      });

    // Commit the batch operation
    try {
      await batch.commit();
      refetch();
      cb();
      console.log("Bulk data added successfully!");
    } catch (error) {
      console.error("Error adding bulk data: ", error);
      setError("Error adding bulk data");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    doAddCategory,
  };
};

/**
 * Retrieve product list from contentful
 * @returns
 */
export const useGetProductList = () => {
  const data = useSelector((state: RootState) => state.products.productList);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    client
      .getEntries()
      .then((space) => {
        const items = space.items.map((item) => ({
          ...item.fields,
          key: item.sys.id,
          id: item.sys.id,
          price: Number(item.fields.price || 0).toFixed(2),
          imageUrl: item.fields?.imageUrl?.fields?.file
        }));

        console.log("items ==>", space.items, items)
        dispatch(setProductList(items));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [dispatch]);

  return {
    data,
    loading,
  };
};
