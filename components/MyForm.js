import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { socket } from '../socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit() {
    setIsLoading(true);

    socket.emit('create-something', value, () => {
      setIsLoading(false);
    });
  }

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => setValue(text)}
        value={value}
      />

      <Button title="Submit" onPress={onSubmit} disabled={isLoading} />
    </View>
  );
}
