// HomeScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';
import { useAppContext } from '../AppContext'

//import SystemNavigationBar from 'react-native-system-navigation-bar';


const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { userData, storeCode, storeUsername, storeHost, storeLastTask, storeThemeDark } = useAppContext();

  const isDarkMode = userData.themeDark;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      //title: 'Custom Title', // Set a custom title
      headerShown: false, // Hide the header
    });
  }, [navigation]);

  const handleNavigateToGenerate = () => {
    navigation.navigate('GenerateCode');
  };

  const handleNavigateToChatScreen = () => {
    navigation.navigate('EnterGameRoom');
  };

  const handleNavigateToSettingsScreen = () => {
    navigation.navigate('Settings');
  };

  return (
    
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
      
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10 }}
      />
      <Text style={styles.text}>Welkom bij TreasureLens! De leukste zoektocht om samen met familie en vrienden te doen.</Text>
      <TouchableOpacity onPress={handleNavigateToGenerate} style={[isDarkMode ? styles.button : styles.lightButton, { marginTop: 100, marginBottom: 0 }]}>
        <Text style={styles.buttonText}>Start zelf een spel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToChatScreen} style={isDarkMode ? styles.button : styles.lightButton}>
        <Text style={styles.buttonText}>Deel mee aan een spel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToSettingsScreen} style={isDarkMode ? styles.button : styles.lightButton}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
