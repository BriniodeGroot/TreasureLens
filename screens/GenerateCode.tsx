// HomeScreen.tsx
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useAppContext } from '../AppContext';
import database from '@react-native-firebase/database';
import { getDatabase, ref, set, push, off, onValue } from "firebase/database";


const GenerateScreen: React.FC = () => {
  const navigation = useNavigation();
  const [randomCode, setRandomCode] = useState('******');
  const { userData, storeCode } = useAppContext();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      //title: 'Custom Title', // Set a custom title
      headerShown: false, // Hide the header
    });
  }, [navigation]);

  const generateCode = () => {
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
  };

  return (
    
    <View style={styles.container}> 
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 100, height: 100, marginTop: 5, borderRadius: 10 }}
      />
      <Text style={styles.text}>Maak hier een gameruimte aan en deel deze met je familie of vrienden.</Text>
      <TouchableOpacity onPress={generateCode} style={[styles.button, { marginTop: 175, marginBottom: 20 }]}>
        <Text style={styles.buttonText}>Geneer een code</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{randomCode}</Text>
    </View>
  );
};

export default GenerateScreen;
