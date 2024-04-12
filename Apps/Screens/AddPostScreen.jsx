import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {
  
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage();
  const [loading,setLoading]=useState(false);
  const {user}=useUser();
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
  
  const onSubmitMethod=async(value)=>{
    setLoading(true);
    //Convert URI to Blob File
    const resp=await fetch(image);
    const blob=await resp.blob();
    const storageRef = ref(storage, 'communityPost/'+Date.now()+".jpg");

    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        value.image=downloadUrl;
        value.userName=user.fullName;
        value.userEmail=user.primaryEmailAddress.emailAddress;
        value.UserImage=user.imageUrl;

        const docRef = await addDoc(collection(db, "UserPost"),value)
        if(docRef.id)
        {
          setLoading(false);
          
          Alert.alert("Success!!","Post added successfully")
        }
        
      })
    });
    
  }

  return (
    <View className="p-10">
      <Text className="text-[27px] font-bold">Add New Post</Text>
      <Text className="text-[16px] text-gray-500 mb-7">Create New Post and Start Selling</Text>
      <Formik
        initialValues={{title:'', desc:'', category:'', address:'', price:'', image:'', username:'', userEmail:'', userImage:''}}
        onSubmit={onSubmitMethod}
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
                style={{
                  backgroundColor:loading?'#ccc':'#007BFF',

                }}
                disabled={loading}
                  className="p-5 bg-blue-500 rounded-full mt-3">
                    {loading?
                     <ActivityIndicator color='#fff' />
                     :
                     <Text className="text-white text-center text-[17px]">Search</Text>
                  }
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