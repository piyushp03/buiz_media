import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ItemList() {
    const {params}=useRoute();
    const db=getFirestore(app);
    const [itemList, setItemList]=useState([]);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        params&&getItemListByCategory();
    }, [params])

    const getItemListByCategory=async()=>{
        setItemList([]);
        setLoading(true);
        const q=query(collection(db, "businessPost"), where("category", "==", params.category));
        const snapshot=await getDocs(q);
        setLoading(false);
        snapshot.forEach(doc=>{
            console.log(doc.data());
            setItemList(itemList=>[...itemList, doc.data()])
            setLoading(false);
        })
    }
  return (
    <View className='p-2'>
      
      {loading?
        <ActivityIndicator size={'large'} color={'#3b599'}/>
        :
      itemList?.length>0? <LatestItemList latestItemList={itemList}
      heading={'Latest Posts'}/>
      :<Text className="p-5 text-[20px] justify-ceter mt-24 text-center text-gray-500">No Posts Found</Text>}
    </View>
  )
}