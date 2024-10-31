import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-conf";

export async function getProductCategories() {
    const categoryCol = collection(db, 'category');
    const categorySnapshot = await getDocs(categoryCol);
    const categoryList = categorySnapshot.docs.map(doc => doc.data());
    
    console.log("categoryList ==>", categoryList)
    return categoryList;
  }