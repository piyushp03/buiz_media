import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_d2VhbHRoeS10b3VjYW4tOTMuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <View className="flex-1 bg-white">
        <StatusBar style="auto" />

        <SignedIn>
          <Text>You are Signed in</Text>
        </SignedIn>

        <SignedOut>
            <LoginScreen/>
        </SignedOut>
    
      </View>
    </ClerkProvider>
  );
}
