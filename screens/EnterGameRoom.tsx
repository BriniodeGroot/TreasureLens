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
    
    <View style={styles.container}> 
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 100, height: 100, marginTop: 5, borderRadius: 10 }}
      />
      <Text style={styles.text}>Vul hier je username in en de code van de gameruimte om deel te nemen</Text>
      <Text>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text>Code:</Text>
      <TextInput
        style={styles.input}
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
