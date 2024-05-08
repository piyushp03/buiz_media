import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import ProductDetail from '../Screens/ProductDetail';
import StripeApp from '../Components/Stripe/StripeApp';


const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>

        <Stack.Screen name="HomeScreen" component={HomeScreen} 
            options={{headerShown: false}}
        />
        <Stack.Screen name="item-list" component={ItemList} 
            options={({ route })=>({title:route.params.category, 
                headerStyle: {backgroundColor: '#3b82f6'},
                headerTintColor: '#fff'
            })}

            /* shows the category name when the tab is opened */
        />

        <Stack.Screen name="product-detail" component={ProductDetail}
        /* ^ points to the page to be redirected */
            options={{
              headerStyle:{
                backgroundColor: '#3b82f6',
              },
              headerTintColor: '#fff',
              headerTitle:'Product Details',
            }}

            /* redirects to the product details page 
            will add google maps location here?
            */
        />

          <Stack.Screen name="payment-screen" component={StripeApp} 
                      options={{headerShown: false}}
                  />

    </Stack.Navigator>
  )
}