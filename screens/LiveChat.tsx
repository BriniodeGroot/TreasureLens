// HomeScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';
//import SystemNavigationBar from 'react-native-system-navigation-bar';
import ChatComponent from '../components/Chat'; // Import your ChatComponent
import { useAppContext } from '../AppContext'




const LiveChat: React.FC = () => {
  const navigation = useNavigation();
  const { userData, storeCode, storeUsername, storeHost, storeLastTask, storeThemeDark } = useAppContext();
  const isDarkMode = userData.themeDark;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      //title: 'Custom Title', // Set a custom title
      headerShown: true, // Hide the header
    });
  }, [navigation]);

  const handleNavigateToUploadZone = () => {
    navigation.navigate('UploadImage');
  };

  return (
    
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
      
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 100, height: 100, borderRadius: 10 }}
      />
      <Text style={[styles.text, {fontSize: 16}]}>Dit is de live chat tijdens de game.</Text>
      <ChatComponent/>
      {/* <TouchableOpacity onPress={handleNavigateToUploadZone} style={styles.button}>
        <Text style={styles.buttonText}>Ga terug naar de uploadzone!</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default LiveChat;
