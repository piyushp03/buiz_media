import { View, Text, Image } from 'react-native'
import React from 'react'

export default function LoginScreen() {
  return (
    <View>
      <Image source={require('./../../assets/images.jpeg')}
      className="w-full h-[400px]"
      />

    <View className="p-8">
        <Text className="text-[30px] font-bold">Marketplace</Text>
    </View>

    </View>
  )
}