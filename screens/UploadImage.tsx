// ChatScreen.tsx
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import styles from '../style';
import {launchImageLibrary} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';

const UploadImageScreen: React.FC = () => {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false, // Hide the header
        });
    }, [navigation]);

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
            <Image source={require('../images/logo.jpg')} style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10 }} />
            <Text style={styles.text}>Upload hier je foto voor de opdracht</Text>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
            <TouchableOpacity onPress={selectImage} style={styles.button}>
                <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
            <Button title="Upload Image" onPress={uploadImage} disabled={!imageUri} />
            <TouchableOpacity onPress={handleCameraLaunch} style={styles.button}>
                <Text style={styles.buttonText}>Launch Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigate} style={styles.button}>
                <Text style={styles.buttonText}>Ga terug naar home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigateToLiveChat} style={styles.button}>
                <Text style={styles.buttonText}>Ga naar live chat</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UploadImageScreen;
