import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import Styles from '../style';
import { useAppContext } from '../AppContext';

export default function HeaderHome() {
  const { userData, storeCode, storeUsername, storeHost } = useAppContext();
  const isDarkMode = userData.themeDark;

  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home');
  }

  const goToSettings = () => {
    navigation.navigate('Settings');
  }

  return (
    
    <View style={[isDarkMode ? Styles.header : Styles.lightHeader]}>
      <TouchableOpacity onPress={goToHome}>
        <Icon name="home-outline" size={28} color={isDarkMode ? "black" : "#d9d8d7"}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSettings}>
      <Icon name="settings-outline" size={28} color={isDarkMode ? "white" : "black"} />
      </TouchableOpacity>
    </View>
  );
}
