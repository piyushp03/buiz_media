import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons';


export default function Header() {
    const {user}=useUser();
  return (
    <View>
      {/*USer info section*/}
      <View className='flex flex-row items-center gap:2'>
        <Image source={{uri:user?.imageUrl}}
        
        className='rounded-full w-12 h-12'
        />

        <View>

          <Text className='text-[16px]'>Welcome</Text>
          <Text className='text-[20px] font-bold'>{user?.firstName}</Text>
        </View>
      </View>
      {/*search bar*/}
      <View className='p-3 px-5 flex flex-row items-center bg-white mt-5 rounded-full border-[1px] border-blue-300 '>
      <FontAwesome name="search" size={24} color="gray" className='ml-3' />

        <TextInput placeholder='Search' className='ml-2 text-[18px]'
        onChangeText={(value)=>console.log(value)}
        />
      </View>
    </View>
  )
}