import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function StripeApp({route}) {
  const {productName}= route.params;
  const {price}= route.params;
  return (
    <View className=''>

        <View className='mt-[35]'><Text>Product Name:{productName}</Text>
        <Text>Product Price:{price}</Text></View>
        
    </View>
  )
}