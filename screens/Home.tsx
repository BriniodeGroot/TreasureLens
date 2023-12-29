// HomeScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';
import SystemNavigationBar from 'react-native-system-navigation-bar';


const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  
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
    navigation.navigate('EnterScreen');
  };

  return (
    
    <View style={styles.container}>
      
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10 }}
      />
      <Text style={styles.text}>Welcome to TreasureLens! De leukste zoektocht om samen met familie en vrienden te doen.</Text>
      <TouchableOpacity onPress={handleNavigateToGenerate} style={[styles.button, { marginTop: 175, marginBottom: 20 }]}>
        <Text style={styles.buttonText}>Start zelf een spel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToChatScreen} style={styles.button}>
        <Text style={styles.buttonText}>Deel mee aan een spel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
