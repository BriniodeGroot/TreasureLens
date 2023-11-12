// SecondScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../style';

const SecondScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Second Screen!</Text>
    </View>
  );
};

export default SecondScreen;

