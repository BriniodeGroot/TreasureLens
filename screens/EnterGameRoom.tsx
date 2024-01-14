// HomeScreen.tsx
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';
//import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useAppContext } from '../AppContext';
import database from '@react-native-firebase/database';
import { getDatabase, ref, set, push, off, onValue, update, get, child, DataSnapshot } from "firebase/database";
import Toast from 'react-native-toast-message';


const EnterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const { userData, storeCode, storeUsername, storeHost } = useAppContext();
  const isDarkMode = userData.themeDark;
  const db = getDatabase();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      //title: 'Custom Title', // Set a custom title
      headerShown: true, // Hide the header
    });
  }, [navigation]);

  const enter = () => {
    console.log(code);
    
    if (code == '' || username == '') {
        ToastAndroid.show('Vul gegevens in', ToastAndroid.SHORT);
        console.log('Vul gegevens in');
    } else {
      let codeExists = false;

      //code voor het checken van de game room code
      const codeRef = ref(db, '/chatRooms');
      const handleSnapshotCode = (snapshot: any) => {
      if (snapshot.exists()) {
        snapshot.forEach((codeData: DataSnapshot) => {
          console.log('Code Data:', codeData.key);
          const codeName = codeData.key;
          if (codeName == code) {
            console.log('code bestaat');
            codeExists = true;
          }
        });
      }
    }
    const unsubscribeCode = onValue(codeRef, handleSnapshotCode);
    
        
    if (codeExists) {
      let playerExists = false;
      navigation.navigate('Game');
      storeCode(code);
      storeUsername(username);
      storeHost(false);

      const messageDataUser = {
        name: username,
        value: 0, 
      };

      //const db = getDatabase();
      const playersRef = ref(db, 'chatRooms/' + code + '/players');

      const handleSnapshot = (snapshot: any) => {
        if (snapshot.exists()) {
          snapshot.forEach((playerData: DataSnapshot) => {
            console.log('Player Data:', playerData.val().name);
            const playerName = playerData.val().name;
            if (playerName == username) {
              console.log('naam bestaat al');
              playerExists = true;
              // The name already exists, so update the value field.
              //update(playersRef.child(username), { value: 0 });
            }
          });
        }
      }

      const unsubscribe = onValue(playersRef, handleSnapshot);

      if (!playerExists) {
        console.log(playerExists);
        console.log('naam bestaat nog niet');

        const newRefUser = push(ref(db, 'chatRooms/' + code + '/players'));

        set(newRefUser, messageDataUser);
      }

      // Unsubscribe when the component unmounts
      return () => {
        off(unsubscribe);
        off(unsubscribeCode)
      };
    } else {
      ToastAndroid.show('Deze code bestaat niet', ToastAndroid.SHORT);
      console.log('Deze code bestaat niet');
    }    
  }
}

  return (
    
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}> 
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 100, height: 100, marginTop: 5, borderRadius: 10 }}
      />
      <Text style={styles.text}>Vul hier een gebruikersnaam in en de code van de gameruimte om mee te doen</Text>
      <Text style = {isDarkMode ? styles.textDark : styles.textLight}>Gebruikersnaam:</Text>
      <TextInput
        style = {isDarkMode ? styles.inputDark : styles.inputLight}
        placeholder="Gebruikersnaam"
        placeholderTextColor={'grey'}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style = {isDarkMode ? styles.textDark : styles.textLight}>Code:</Text>
      <TextInput
        style = {isDarkMode ? styles.inputDark : styles.inputLight}
        placeholder="Gameroom code"
        placeholderTextColor={'grey'}
        value={code}
        onChangeText={(text) => setCode(text)}
      />
      <TouchableOpacity onPress={enter} style={[isDarkMode ? styles.button : styles.lightButton, { marginTop: 175, marginBottom: 20 }]}>
        <Text style={styles.buttonText}>Speel mee</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterScreen;
function callback(arg0: boolean) {
  throw new Error('Function not implemented.');
}

