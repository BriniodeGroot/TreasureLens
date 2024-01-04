// HomeScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';
//import SystemNavigationBar from 'react-native-system-navigation-bar';


const VotingScreen: React.FC = () => {
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      //title: 'Custom Title', // Set a custom title
      headerShown: false, // Hide the header
    });
  }, [navigation]);

  return (
    
    <View style={styles.container}>
      
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 100, height: 100, marginTop: 20, borderRadius: 10 }}
      />
      <Text style={styles.text}>Stem tijd, wie heeft de leukste foto?</Text>
    </View>
  );
};

export default VotingScreen;
