import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import Styles from '../style';

export default function HeaderGame() {
  const navigation = useNavigation();

  const goToHome = () => {
    Alert.alert(
      'Bevestig',
      'Zeker dat je het spel wilt verlaten?',
      [
        {
          text: 'Nee',
          style: 'cancel',
        },
        {
          text: 'Ja',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false }
    );
    
  }

  const goToSettings = () => {
    navigation.navigate('Settings');
  }

  return (
    
    <View style={Styles.header}>
      <TouchableOpacity onPress={goToHome}>
        <Icon name="close-outline" size={36} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSettings}>
      <Icon name="settings-outline" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
