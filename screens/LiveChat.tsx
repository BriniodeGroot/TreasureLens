// HomeScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';
//import SystemNavigationBar from 'react-native-system-navigation-bar';
import ChatComponent from '../components/Chat'; // Import your ChatComponent



const LiveChat: React.FC = () => {
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      //title: 'Custom Title', // Set a custom title
      headerShown: false, // Hide the header
    });
  }, [navigation]);

  const handleNavigateToUploadZone = () => {
    navigation.navigate('UploadImage');
  };

  return (
    
    <View style={styles.container}>
      
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 100, height: 100, borderRadius: 10 }}
      />
      <Text style={styles.text}>Dit is de live chat tijdens de game.</Text>
      <ChatComponent/>
      <TouchableOpacity onPress={handleNavigateToUploadZone} style={styles.button}>
        <Text style={styles.buttonText}>Ga terug naar de uploadzone!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LiveChat;
