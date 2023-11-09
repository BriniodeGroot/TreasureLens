// Header.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Header;
