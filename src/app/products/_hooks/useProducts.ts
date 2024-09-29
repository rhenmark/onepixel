import { db } from "@/config/firebase/firebase-conf"
import { getDocs, collection, writeBatch, doc } from "firebase/firestore"
import { useEffect, useState } from "react"

export const useGetCategories = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const [_, refetch] = useState<boolean>()

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "category"))
                const res = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                setData(res)
                setLoading(false)
            } catch {
                setLoading(false)
            }
          }
      
          fetchItems()
    }, [refetch])
   
    return {
        loading, 
        data,
        refetch
    }
}

export const useAddCategories = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>([])
    const [error, setError] = useState<null | string>()
    const {refetch} = useGetCategories()

    const doAddCategory = async (categories: string[]) => {
        setLoading(true);

        const batch = writeBatch(db);  // Initialize batch write
        const usersRef = collection(db, "category");  // Replace "users" with your collection
      
        // Iterate through the data array and add each one to the batch
        categories.map((item) => ({name: item, isActive: true})).forEach((data) => {
          const newDocRef = doc(usersRef);  // Auto-generate document ID
          batch.set(newDocRef, data);  // Add each document to the batch
        });
      
        // Commit the batch operation
        try {
          await batch.commit();
          refetch(true)
          console.log('Bulk data added successfully!');
        } catch (error) {
          console.error('Error adding bulk data: ', error);
          setError("Error adding bulk data")
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        data,
        doAddCategory,
    }
}