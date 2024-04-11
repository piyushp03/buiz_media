import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, getDocs, collection } from 'firebase/firestore';


export default function AddPostScreen() {
  
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const [categoryList, setCategoryList]=useState([]);

  useEffect(()=>{
    getCategoryList();
  },[]) // when component is initialied [] lets the method load only once

  const getCategoryList=async()=>{
    setCategoryList([]);
    const querySnapshot=await getDocs(collection(db, "P_Category")); // category collection
    
    querySnapshot.forEach((doc)=>{
      console.log("Docs:", doc.data());
      setCategoryList(categoryList=>[...categoryList, doc.data()]);
    })

  }

  /**
   * Used to pick image from gallery
   */

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const onSubmitMethod=(value)=>{
    value.image=image;
    console.log(value);
  }

  return (
    <View className="p-10">
      <Text className="text-[27px] font-bold">Add New Post</Text>
      <Text className="text-[16px] text-gray-500 mb-7">Create New Post and Start Selling</Text>
      <Formik
        initialValues={{title:'', desc:'', category:'', address:'', price:'', image:''}}
        onSubmit={value=>onSubmitMethod=(value)}
        validate={(values)=>{
          const errors={}
          if(!values.title)
          {
            console.log("Title not Present");
            ToastAndroid.show('Title must be there', ToastAndroid.SHORT)
            errors.name="Title must be there"
          }
          return errors
        }}
      >
          {({handleChange,handleBlur,handleSubmit,values,setFieldValue,initialErrors})=>(
            <View>

              <TouchableOpacity onPress={pickImage}/>
              {image?
              <image source={{uri:image}} style={{width:100,height:100,borderRadius:15}}/>
              :
              <Image source={require('./../../assets/images.jpeg')}
              style={{width:100,height:100,borderRadius:15}}
                />}
                <TextInput
                  style={styles.input}
                  placeholder='Title'
                  value={values?.title}
                  onChangeText={handleChange('title')}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Description'
                  value={values?.desc}
                  numberOfLines={5}
                  onChangeText={handleChange('desc')}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Price'
                  value={values?.price}
                  keyboardType='number-pad'
                  onChangeText={handleChange('price')}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Address'
                  value={values?.address}
                  onChangeText={handleChange('address')}
                />

              <Picker
                selectedValue={values?.category}
                style={styles.input}
                onValueChange={handleChange('category')}
              >
                {categoryList&&categoryList.map((item, index)=>(
                  <Picker.Item key={index}
                  label={item.name} value={item.name} />
                ))}
                
              </Picker>

                <TouchableOpacity onPress={handleSubmit} 
                  className="p-5 bg-blue-500 rounded-full mt-3">
                  <Text className="text-white text-center text-[17px]">Search</Text>
                </TouchableOpacity>


                {/*<Button onPress={handleSubmit} 
                className="mt-7"
              title="Submit"/>*/}
            </View>

          )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({ 
    input:{
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop:10, marginBottom:5,
        paddingHorizontal:17,
        textAlignVertical:'top',
        fontSize:17
    }

})