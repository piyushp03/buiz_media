import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import myPosts from './../../assets/images/myPosts.png'
import search from './../../assets/images/search.png'
import logout from './../../assets/images/logout.png'
import { useNavigation } from '@react-navigation/native'

export default function ProfileScreen() {

  const {user}=useUser();
  const navigation=useNavigation();
  const {isLoaded, signOut} = useAuth();
  const menuList=[
    {
      id:1,
      name:'My Posts ',
      icon: myPosts,
      path:'my-product'
    },
    {
      id:2,
      name:'Explore',
      icon: search,
      path:'explore'
    },
    {
      id:3,
      name:'Logout',
      icon: logout
    }
  ]


  const onMenuPress=(item)=>{
    if(item.name=='Logout'){
      signOut();
    }
    item?.path?navigation.navigate(item.path):null;
  }

  return (
    <View class='p=5 bg-white flex-1'>
      <View className='flex flex-full items-center justify-center mt-20'>
        
        <Image source={{uri:user?.imageUrl}}
        className='w-[100px] h-[100px] rounded-full '
        />

        <Text className='font-bold text-[25px] mt-2'>{user?.fullName}</Text>
        <Text className='font-bold text-[15px] mt-2 text-gray-400'>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>


        <FlatList 
          data={menuList}
          numColumns={2}
          style={{marginTop:20}}
          renderItem={({item,index})=>(
            <TouchableOpacity 
              onPress={()=>onMenuPress(item)}
            className='flex-1 p-3 border-[1px] items-center mx-4 mt-4 rounded-md border-blue-400 bg-blue-100'>
              {item.icon&& <Image source={item.icon} 
              className='w-[50px] h-[50px]'/>}
              <Text className='text-[10px] mt-[1px]'>{item.name} </Text>
            </TouchableOpacity>
          )}
        
        />
    </View>
  )
}