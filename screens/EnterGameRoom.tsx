// HomeScreen.tsx
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';
//import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useAppContext } from '../AppContext';
import database from '@react-native-firebase/database';
import { getDatabase, ref, set, push, off, onValue } from "firebase/database";
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
      headerShown: false, // Hide the header
    });
  }, [navigation]);

  const enter = () => {
    console.log(code);
    
    if (code == '' || username == '') {
        ToastAndroid.show('Vul gegevens in', ToastAndroid.SHORT);
        console.log('Vul gegevens in');
    } else {
        navigation.navigate('Game');
        storeCode(code);
        storeUsername(username);
        storeHost(false);

        const messageData = {
          name: username,
          value: 0, 
        };

        const db = getDatabase();
        const newMessageRef = push(ref(db, 'chatRooms/' + code + '/players'));

        set(newMessageRef, messageData);
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
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style = {isDarkMode ? styles.textDark : styles.textLight}>Code:</Text>
      <TextInput
        style = {isDarkMode ? styles.inputDark : styles.inputLight}
        placeholder="Game Room Code"
        value={code}
        onChangeText={(text) => setCode(text)}
      />
      <TouchableOpacity onPress={enter} style={[styles.button, { marginTop: 175, marginBottom: 20 }]}>
        <Text style={styles.buttonText}>Speel mee</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterScreen;
