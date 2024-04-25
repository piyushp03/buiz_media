import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/HomeScreen/Header'
import Slider from '../Components/HomeScreen/Slider'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from '../../firebaseConfig';
import Categories from '../Components/HomeScreen/Categories';


export default function HomeScreen() {

  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getSliders();
    getCategoryList();
  }, [])


  const getSliders=async()=>{
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Sliders"));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  //console.log(doc.id, " => ", doc.data()); logs pulled slider images
  setSliderList(sliderList=>[...sliderList,doc.data()]);
});
  }


  const getCategoryList=async()=>{
    setCategoryList([]);
    const querySnapshot=await getDocs(collection(db, "Category")); // category collection

    querySnapshot.forEach((doc)=>{
      console.log("Docs:", doc.data());
      setCategoryList(categoryList=>[...categoryList, doc.data()]);
    })

  }


  return (
    <View className='py-8 px-6 bg-white flex-1'>
      <Header/>
      <Slider sliderList={sliderList}/>
      <Categories categoryList={categoryList}/>
    </View>
  )
}