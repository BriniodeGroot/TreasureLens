import React from 'react';
import { View, Text } from 'react-native';

export function Events({ events }) {
  return (
    <View>
      {events.map((event, index) => (
        <Text key={index}>{event}</Text>
      ))}
    </View>
  );
}
