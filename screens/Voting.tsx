// HomeScreen.tsx
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';
//import SystemNavigationBar from 'react-native-system-navigation-bar';
import { getDatabase, ref, set, push, off, onValue, Query, orderByChild, equalTo, update } from "firebase/database";
import { useAppContext } from '../AppContext';
import { firebase } from '@react-native-firebase/database';
import { get } from 'firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';



const VotingScreen: React.FC = () => {
  const navigation = useNavigation();
  const { userData, storeCode, storeUsername, storeHost, storeLastTask } = useAppContext();
  const [images, setImages] = useState([]);
  const [winner, setWinner] = useState('');
  const [names, setNames] = useState([]);
  const isDarkMode = userData.themeDark;
  const [task, setTask] = useState('');
  const [votingDisabled, setVotingDisabled] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      //title: 'Custom Title', // Set a custom title
      headerShown: true, // Hide the header
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
        setVotingDisabled(false);
      }
    };
  
    const unsubscribe = onValue(photosRef, handleSnapshot);
  
    return () => {
      unsubscribe();
    };
  
  }, [userData.lastTask]);

  const checkVote = () => {
    if (votingDisabled) {
      ToastAndroid.show('Je hebt al gestemd', ToastAndroid.SHORT);
    } else {
      vote();
    }
  }
  


  const vote = () => {
    const db = getDatabase();
    const playerRef = ref(db, `chatRooms/${userData.code}/players`);

    const enteredName = winner.trim();
    if (!enteredName) {
      //console.warn('Vul een juiste spelersnaam in.');
      ToastAndroid.show('Vul een spelersnaam in', ToastAndroid.SHORT);
      return;
    }

    // Use get for the initial data fetch
    get(playerRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((playerData: any) => {
            const playerName = playerData.val()?.name;
            if (playerName === enteredName) {
              const playerKey = playerData.key;
              const currentPlayerValue = playerData.val()?.value || 0; // Set default value to 0 if not present
              console.log('Player Value before vote:', currentPlayerValue);
              //console.warn('Gestemd op speler: ', playerName);
              ToastAndroid.show('Gestemd op speler: ' + playerName, ToastAndroid.SHORT);

              const newPlayerValue = currentPlayerValue + 1;

              const updates = {};
              updates[`chatRooms/${userData.code}/players/${playerKey}/value`] = newPlayerValue;

              setVotingDisabled(true);
              // Use on for subsequent updates
              const unsubscribe = onValue(playerRef, (snapshot) => {
                const updatedValue = snapshot.val()?.value;
                console.log('New Player Value:', updatedValue);
              });

              // Update the player's value in the database
              update(ref(db), updates);

              return () => {
                unsubscribe();
              };
            } else {
              //console.warn('Spelersnaam niet gevonden.');
              ToastAndroid.show('Spelersnaam niet gevonden', ToastAndroid.SHORT);
            }
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  


  function navigateToScore(): void {
      navigation.navigate('Scoring');
  }

  const renderContent = () => {
    if (userData.gameEnded) {
      return (
      <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
        <Image
      source={require('../images/logo.jpg')}
      style={{ width: 100, height: 100, marginTop: 0, borderRadius: 10 }}
      />
      <Text style={[styles.text, {fontSize: 16}]}>Jammer, de game is voorbij!</Text>
      </View>
    )} else {
  return (
    
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
      
      
      <TouchableOpacity onPress={navigateToScore} style={[isDarkMode ? [styles.button, {backgroundColor: '#9197AE'}] : [styles.lightButton, { backgroundColor: 'lightgreen'}]]}>
        <Icon name="bar-chart-outline" size={28} color="black" />
        <Text style={[styles.buttonText]}>Tussenstand</Text>
      </TouchableOpacity>
      <Text style={[styles.text, {fontSize: 16}]}>Tijd om te stemmen, wie heeft de leukste foto?</Text>
      
      <FlatList
        data={images}
        // keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
        <View style={styles.scrollViewContent}>
          <Text style={isDarkMode? styles.smallText: styles.lightSmallText}>{item.name}:</Text>
          {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.imagePreview} />}
        </View>
        )}
      />
      <TextInput
        style={isDarkMode ? styles.input : styles.inputLight}
        placeholder="Naam van speler"
        placeholderTextColor={'grey'}
        value={winner}
        onChangeText={(text) => setWinner(text)}
      />
      <TouchableOpacity onPress={checkVote} style={[isDarkMode ? styles.button : styles.lightButton, { marginBottom: 20 }]}>
        <Text style={styles.buttonText}>Dien stem in</Text>
      </TouchableOpacity>
    </View>
  );
        }
  };

  return renderContent();
};

export default VotingScreen;
