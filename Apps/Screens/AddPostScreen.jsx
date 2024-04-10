import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { app } from '../../firebaseConfig';
import { getFirestore, getDocs, collection } from 'firebase/firestore';


export default function AddPostScreen() {
  
  const db = getFirestore(app);
  const [categoryList, setCategoryList]=useState([]);

  useEffect(()=>{
    getCategoryList();
  },[]) // when component is initialied [] lets the method load only once

  const getCategoryList=async()=>{
    const querySnapshot=await getDocs(collection(db, "P_Category")); // category collection
    
    querySnapshot.forEach((doc)=>{
      console.log("Docs:", doc.data());
      setCategoryList(categoryList=>[...categoryList, doc.data()]);
    })

  }
  
  return (
    <View>
      <Text>AddPostScreen</Text>
    </View>
  )
}