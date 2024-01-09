import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import Styles from '../style';

export default function HeaderHome() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home');
  }

  const goToSettings = () => {
    navigation.navigate('Settings');
  }

  return (
    
    <View style={Styles.header}>
      <TouchableOpacity onPress={goToHome}>
        <Icon name="home-outline" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSettings}>
      <Icon name="settings-outline" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
