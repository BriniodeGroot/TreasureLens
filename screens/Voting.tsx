// HomeScreen.tsx
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
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
  const isDarkMode = userData.themeDark;

  
  useLayoutEffect(() => {
    navigation.setOptions({
      //title: 'Custom Title', // Set a custom title
      headerShown: false, // Hide the header
    });
  }, [navigation]);

  useEffect(() => {
    // Your code here
  
    const db = firebase.database();
    // Replace with your actual chat room ID
    const chatRoomId = userData.code;
    const task = userData.lastTask;
    const player = userData.username;

    console.log(task);

    // const refPhotos = db.ref(`chatRooms/${chatRoomId}/photos`);
    // const snapshot = await
    // firebase.database().ref(`chatRooms/${chatRoomId}/photos`).orderByChild('task').equalTo(task).once('value');
    // snapshot.forEach((snapshot) => {
    //   console.log('taak:', snapshot.val().task);

    // });
  }, []);


    // console.log(result);
    // console.log(queryTasks);

    // const onDataChange = (snapshot) => {
    //   const filteredData = snapshot.val();
    //   console.log('Filtered Data:', filteredData);
    //   // Update your component state or take other actions with the new data
    // };
  
    // queryTasks.on('value', onDataChange);
  
    // // Clean up the listener when the component unmounts
    // return () => {
    //   queryTasks.off('value', onDataChange);
    // };
  

    // const handleSnapshot = (snapshot) => {
    //   if (snapshot.exists()) {
    //     const data = snapshot.val();
    //     const imageArray = Object.values(data);
    //     setImages(imageArray);
    //   }
    // };
    
    // // Retrieve the filtered data
    // queryTasks.once('value', (snapshot) => {
    // // Handle the retrieved data
    // const filteredData = snapshot.val();
    // console.log(filteredData);
    // setImages(Object.values(filteredData));
    // });

  //   const unsubscribe = onValue(queryTasks, handleSnapshot);

  //   // Unsubscribe when the component unmounts
  //   return () => {
  //     off(unsubscribe);
  //   };
  // }, []);

  return (
    
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
      
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 100, height: 100, marginTop: 20, borderRadius: 10 }}
      />
      <Text style={styles.text}>Stem tijd, wie heeft de leukste foto?</Text>
      <FlatList
        data={images}
        //keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
  };

export default VotingScreen;
