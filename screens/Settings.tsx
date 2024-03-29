import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import styles from '../style';
import { useAppContext } from '../AppContext'


const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { userData, storeCode, storeUsername, storeHost, storeLastTask, storeThemeDark } = useAppContext();

  const isDarkMode = userData.themeDark;

  useLayoutEffect(() => {
    if (isDarkMode) {
      navigation.setOptions({
        title: 'Instellingen', // Set a custom title
        headerTintColor: 'white',
        headerTitleStyle: {
          color: 'white', // Set the title color
        },
        headerStyle: {
          backgroundColor: 'black', // Set the desired color
        },
      });
    } else {
      navigation.setOptions({
        title: 'Instellingen', // Set a custom title
        headerTintColor: 'black',
        headerTitleStyle: {
          color: 'black', // Set the title color
        },
        headerStyle: {
          backgroundColor: 'white', // Set the desired color
        },
      });
    }
  }, [navigation, isDarkMode]);
  

  const switchDarkMode = () => {
    if (userData.themeDark == false) {
      storeThemeDark(true)
    }
    else {
      storeThemeDark(false)
    }
  }

  return (
    
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
      
      <Image
      source={require('../images/logo.jpg')}
      style={{ width: 100, height: 100, marginTop: 20, borderRadius: 10 }}
      />
      <Text style={styles.text}>Instellingen</Text>
      <TouchableOpacity onPress={switchDarkMode} style={isDarkMode ? styles.button : styles.lightButton}>
      <Text style={styles.buttonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
