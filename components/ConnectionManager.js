import React from 'react';
import { View, Button } from 'react-native';
import { socket } from '../socket';

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <View>
      <Button title="Connect" onPress={connect} />
      <Button title="Disconnect" onPress={disconnect} />
    </View>
  );
}
