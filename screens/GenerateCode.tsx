// HomeScreen.tsx
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, TextInput, ToastAndroid, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';
//import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useAppContext } from '../AppContext';
import database from '@react-native-firebase/database';
import { getDatabase, ref, set, push, off, onValue } from "firebase/database";



const GenerateScreen: React.FC = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [randomCode, setRandomCode] = useState('******');
  const { userData, storeCode, storeUsername, storeHost } = useAppContext();
  const isDarkMode = userData.themeDark;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      //title: 'Custom Title', // Set a custom title
      headerShown: true, // Hide the header
    });
  }, [navigation]);

  const generateCode = () => {
    if (username == '') {
        ToastAndroid.show('Vul een username in', ToastAndroid.SHORT);
        console.log('Vul een username in');
    } else {
    storeUsername(username);
    const code = Math.floor(100000 + Math.random() * 900000);

    // Set the random code in the state
    setRandomCode(code.toString());
    storeCode(code.toString());
    console.log(userData.code);

    const messageData = {
        text: "Welkom bij de chat van de gameruimte: " + code + "!",
      };

    const db = getDatabase();
    const newMessageRef = push(ref(db, 'chatRooms/' + code + '/messages'));

    set(newMessageRef, messageData);
    storeHost(true);

    const messageDataUser = {
      name: username,
      value: 0, 
    };

    const newMessageRefUser = push(ref(db, 'chatRooms/' + code + '/players'));

    set(newMessageRefUser, messageDataUser);
    }
  };

  const startGame = () => {
    if (randomCode == '******') {
        ToastAndroid.show('Maak een code aan', ToastAndroid.SHORT);
        console.log('Vul een username in');
    } else {
        navigation.navigate('Game');
    }
  }

  const shareOptions = {
    title: 'Code',
    message: randomCode, // Note that according to the documentation at least one of "message" or "url" fields is required
  };

    const onSharePress = async () => {
        if (randomCode == '******') {
            ToastAndroid.show('Maak een code aan', ToastAndroid.SHORT);
            console.log('Vul een username in');
        } else {
        await Share.share(shareOptions);
        }
    };

  

  return (
    
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}> 
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 100, height: 100, marginTop: 5, borderRadius: 10 }}
      />
      <Text style={styles.text}>Maak hier een gameruimte aan en deel deze met je familie of vrienden.</Text>
      <Text style = {isDarkMode ? styles.textDark : styles.textLight}>Username:</Text>
      <TextInput
        style = {isDarkMode ? styles.inputDark : styles.inputLight}
        placeholder="Username"
        placeholderTextColor={'grey'}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TouchableOpacity onPress={generateCode} style={isDarkMode ? styles.button : styles.lightButton}>
        <Text style={styles.buttonText}>Geneer een code</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{randomCode}</Text>
      <View style={styles.createCodeContainer}>
        <TouchableOpacity onPress={onSharePress} style={isDarkMode ? styles.buttonSecondary : styles.lightButtonSecondary}>
          <Text style={styles.buttonText}>Share code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={startGame} style={isDarkMode ? styles.button : styles.lightButton} >
          <Text style={styles.buttonText}>Start het spel</Text>
        </TouchableOpacity>
      </View>
      
      
    </View>
  );
};

export default GenerateScreen;
