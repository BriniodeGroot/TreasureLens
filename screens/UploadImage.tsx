// ChatScreen.tsx
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import styles from '../style';
import {launchImageLibrary} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';
import HostTask from '../components/HostTask';
import { useAppContext } from '../AppContext';
import { getDatabase, ref, set, push, off, onValue, Query } from "firebase/database";

const UploadImageScreen: React.FC = () => {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [task, setTask] = useState<{ text: string } | null>(null);
    //const [task, setTask] = useState<{ text: string } | null>(null);
    //const [task, setTask] = useState([]);
    const { userData, storeCode, storeUsername, storeHost } = useAppContext();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false, // Hide the header
        });
    }, [navigation]);

    
    useEffect(() => {
      const db = getDatabase();
      // Replace with your actual chat room ID
      const chatRoomId = userData.code;
      const chatRef: Query = ref(db, `chatRooms/${chatRoomId}/tasks`);
  
      const handleSnapshot = (snapshot: any) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const tasks = Object.values(data);
          
          if (tasks.length > 0) {
            let newTask = [];
            const newTask = tasks[tasks.length - 1]; // Get the last item in the array
            console.log(newTask as string);
            setTask(newTask);
          }
        }
      };
  
      const unsubscribe = onValue(chatRef, handleSnapshot);
  
      // Unsubscribe when the component unmounts
      return () => {
        off(unsubscribe);
      };
    }, []);

    const handleNavigate = () => {
        navigation.navigate('Home');
    };

    const handleNavigateToLiveChat = () => {
      navigation.navigate('LiveChat');
  };

    const selectImage = () => {


        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
          };
      
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('Image picker error: ', response.error);
            } else {
              let imageUriLibrary = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUriLibrary);
            setImageUri(imageUriLibrary);
            }
          });

        // ImagePicker.showImagePicker({}, (response: { uri: string | null }) => {
        //     if (response.uri) {
        //         setImageUri(response.uri);
        //     }
        // });
    };

    const handleCameraLaunch = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
      
        launchCamera(options, response => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.error) {
            console.log('Camera Error: ', response.error);
          } else {
            let imageUriCamera = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUriCamera);
            setImageUri(imageUriCamera);
            //console.log(imageUri);
          }
        });
      }

    const uploadImage = async () => {
        try {
            if (!imageUri) {
                Alert.alert('Select an image first!');
                return;
            }

            const response = await fetch(imageUri);
            const blob = await response.blob();
            const fileName = `${Date.now()}.jpg`;
            const storageRef = storage().ref(`images/${fileName}`);
            await storageRef.put(blob);

            // Get the download URL
            const downloadURL = await storageRef.getDownloadURL();

            // Save downloadURL in the Realtime Database
            await database().ref('chats/default/messages').push({
                imageUrl: downloadURL,
                timestamp: database.ServerValue.TIMESTAMP,
            });

            Alert.alert('Image Uploaded Successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error uploading image. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../images/logo.jpg')} style={{ width: 50, height: 50, marginTop: 5, borderRadius: 10 }} />
            <Text style={styles.text}>Upload hier je foto voor de opdracht</Text>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
            {/* <TouchableOpacity onPress={selectImage} style={styles.button}>
                <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity> */}
            <Text style={[styles.buttonSecondary, {color: '#000000', marginBottom: 20, fontSize: 20}]}>{task}</Text>
            {userData.host ? (<HostTask/>) : null}
            <Button title="Upload Image" onPress={uploadImage} disabled={!imageUri} />
            <TouchableOpacity onPress={handleCameraLaunch} style={styles.button}>
                <Text style={styles.buttonText}>Launch Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigateToLiveChat} style={[styles.button, {marginTop: 300}]}>
                <Text style={styles.buttonText}>Ga naar live chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigate} style={styles.button}>
                <Text style={styles.buttonText}>Ga terug naar home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UploadImageScreen;
