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
        let playerExists = false;
        navigation.navigate('Game');
        storeCode(code);
        storeUsername(username);
        storeHost(false);

        const messageDataUser = {
          name: username,
          value: 0, 
        };

      const db = getDatabase();
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
      };

      // Check if the name already exists in the database.
    //   get(playersRefChild).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log('naam bestaat al');
    //     // The name already exists, so update the value field.
    //     //update(playersRef.child(username), { value: 0 });
    //   } else {
    //     // The name does not exist, so create a new document.
    //     push(playersRef, messageData);
    //     console.log('naam bestaat nog niet');
    //   }
    // });
    }
}

  return (
    
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}> 
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 100, height: 100, marginTop: 5, borderRadius: 10 }}
      />
      <Text style={styles.text}>Vul hier je username in en de code van de gameruimte om deel te nemen</Text>
      <Text style = {isDarkMode ? styles.textDark : styles.textLight}>Username:</Text>
      <TextInput
        style = {isDarkMode ? styles.inputDark : styles.inputLight}
        placeholder="Username"
        placeholderTextColor={'grey'}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style = {isDarkMode ? styles.textDark : styles.textLight}>Code:</Text>
      <TextInput
        style = {isDarkMode ? styles.inputDark : styles.inputLight}
        placeholder="Game Room Code"
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
