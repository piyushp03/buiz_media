import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" }); //? imports the hook

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image source={require('./../../assets/images.jpeg')} // ! better image
      className="w-full h-[400px] object-cover"
      />

      <View className="p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md">
          <Text className="text-[35px] font-bold">Marketplace</Text>
          <Text className="text-[18px] text-slate-500 mt-6">Place where you can see your local business</Text>

          <>{/*? entry point to the app when clicked sigin is logged to the console*/}</>
          <TouchableOpacity onPress={onPress} className="p-4 bg-blue-500 rounded-full mt-20">
            <Text className="text-white text-center text-[18px]">Get started</Text>
          </TouchableOpacity>
      </View>

    </View>
  )
}