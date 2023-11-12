// HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('SecondScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to TreasureLens!</Text>
      <Button title="Ga naar de volgende pagina" onPress={handleNavigate} />
    </View>
  );
};

export default HomeScreen;
