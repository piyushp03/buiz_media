import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Share, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { doc, deleteDoc, query, collection, getFirestore, where, getDocs } from "firebase/firestore";
import { app } from '../../firebaseConfig';
import StripeApp from '../Components/Stripe/StripeApp';

export default function ProductDetail({navigation}) {
  const {params}=useRoute();
  const [product, setProduct] = useState([]);
  const {user}=useUser();
  const db=getFirestore(app);
  const nav=useNavigation();

  useEffect(() => {
    console.log(params);
    params&&setProduct(params.product);
    shareButton();
  },[params,navigation])
  
  const shareButton=()=>{
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={()=>shareProduct()}>
        <FontAwesome name="share" size={20} color="white" 
          style={{marginRight:10}}
          
        />
      </TouchableOpacity>
      ),
    })
  }


  const shareProduct=async()=>{
    const content={
      message:product?.title+'\n'+product?.desc,
    }
    Share.share(content).then(resp=>{
      console.log(resp);
    },(error)=>{
      console.log(error);
    })
  }

  const SendEmailMessage=()=>{
    const subject='Regarding '+product.title;
    const body="Hi "+product.userName+",\n";
    Linking.openURL(`mailto:${product.userEmail}`+"?subject" + subject+ '&body=' + body);
  }

  const deleteUserPost=async()=>{
    Alert.alert('Do you want to delete this post?', 'This post will be deleted', [
      {text:'Yes',
      onPress:()=>deleteFromFirestore()
      },{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ])
  }
  const deleteFromFirestore=async()=>{
    console.log('Deleted');
    const q=query(collection(db,'businessPost'),where('title', '==', product.title));
    const snapshot=await getDocs(q);
    snapshot.forEach(async(doc)=>{
      deleteDoc(doc.ref).then(resp=>{
        console.log("Documented deleted");
          nav.goBack();
      });
    })
  }

  return (
    <ScrollView className="bg-white">
      <Image source={{uri:product.image}}
        className="h-[320px] w-full"
      />

      <View className='p-3'>
        <Text className='text-[24px] font-bold'>{product?.title}</Text>
        <View className='items-baseline'>
          <Text className="bg-blue-200 text-blue-500 text-[20px] font-bold bg-blue-200 p-[2px] rounded-full px-1 text-[15px] w-[100px] text-center mt-2">{product.category}</Text>
        </View>
        <Text className="mt-3 font-bold text-blue-500 text-[18px]">₹{product?.price}</Text>
        <Text className="mt-3 font-bold text-[20px]">Product Description</Text>
        <Text className='text-[17px] text-gray-500'>{product?.desc}</Text>
      
      
      </View>

     <Button title='Pay' onPress={()=>navigation.navigate('payment-screen')}/>
      
      {/* posting user */}
        <View className='p-3 border-[1px] bg-blue-100 border-gray-400'>
          <Image source={{uri:product.userImage}} 
            className="h-12 w-12 rounded-full mt-3"
          />
          <Text className='text-[20px] font-bold'>{product.userName} </Text>
          <Text className='text-[15px] text-gray-500 mt-1'>{product.userEmail} </Text>
        </View>


      {/* send message */}


      {user?.primaryEmailAddress.emailAddress==product.userEmail?
      <TouchableOpacity 
      onPress={()=>deleteUserPost()}
      className="z-40 bg-red-500 rounded-lg w-full p-3 m-1 ">
        <Text className="text-center text-white">
          Delete Post!
        </Text>
      </TouchableOpacity>
      :
      <TouchableOpacity 
      onPress={()=>SendEmailMessage()}
      className="z-40 bg-blue-500 rounded-lg w-full p-3 m-1 ">
        <Text className="text-center text-white">
          Send us an Email!
        </Text>
      </TouchableOpacity>
    }
      </ScrollView>

  )
}