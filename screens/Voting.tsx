// HomeScreen.tsx
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';
//import SystemNavigationBar from 'react-native-system-navigation-bar';
import { getDatabase, ref, set, push, off, onValue, Query, orderByChild, equalTo } from "firebase/database";
import { useAppContext } from '../AppContext';
import { firebase } from '@react-native-firebase/database';


const VotingScreen: React.FC = () => {
  const navigation = useNavigation();
  const { userData, storeCode, storeUsername, storeHost, storeLastTask } = useAppContext();
  const [images, setImages] = useState([]);
  const [winner, setWinner] = useState('');
  const [names, setNames] = useState([]);
  const [task, setTask] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      //title: 'Custom Title', // Set a custom title
      headerShown: false, // Hide the header
    });
  }, [navigation]);

  useEffect(() => {
    const task = userData.lastTask;
  
    const db = getDatabase();
    const photosRef = ref(db, `chatRooms/${userData.code}/photos`);
  
    const handleSnapshot = (snapshot: any) => {
      if (snapshot.exists()) {
        console.log('task: ', task)
        console.log('snapshot: ', snapshot)
        const newImages: any[] | ((prevState: never[]) => never[]) = [];
        snapshot.forEach((photoData: any) => {
          const taskImage = photoData.val()?.task; // Use optional chaining to avoid errors
          if (task === taskImage) {
            newImages.push(photoData.val());
          }
        });
        setImages(newImages);
        console.log('images: ', newImages)
      }
    };
  
    const unsubscribe = onValue(photosRef, handleSnapshot);
  
    return () => {
      unsubscribe();
    };
  
  }, [userData.lastTask]);
  

  const vote = () => {

  }

  return (
    
    <View style={styles.container}>
      
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 50, height: 50, marginTop: 0, borderRadius: 10 }}
      />
      <Text style={[styles.text, {fontSize: 16}]}>Stem tijd, wie heeft de leukste foto?</Text>
      
      <FlatList
        data={images}
        // keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
        <View style={styles.scrollViewContent}>
          <Text style={styles.smallText}>{item.name}:</Text>
          {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.imagePreview} />}
        </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="naam van speler"
        placeholderTextColor={'grey'}
        value={winner}
        onChangeText={(text) => setWinner(text)}
      />
      <TouchableOpacity onPress={vote} style={[styles.button, { marginBottom: 20 }]}>
        <Text style={styles.buttonText}>Dien stem in</Text>
      </TouchableOpacity>
    </View>
  );
  };

export default VotingScreen;
