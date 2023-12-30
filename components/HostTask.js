import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import styles from '../style';
import { getDatabase, ref, set, push, off, onValue } from "firebase/database";
import { useAppContext } from '../AppContext';

const TaskManager = () => {
  const [nextTask, setNextTask] = useState('');
  const { userData, storeCode, storeUsername, storeHost } = useAppContext();

  const handleSendTask = () => {
    // Add logic to send the task (e.g., use an API call)
    //console.log('Task sent:', nextTask);

    const messageData = {
      text: nextTask,
    };

    const code = userData.code;

    const db = getDatabase();
    const newMessageRef = push(ref(db, 'chatRooms/' + code + '/tasks'));

    set(newMessageRef, messageData);

    // Reset the input field after sending the task
    setNextTask('');
  };

  return (
    <View>
        <Text>Opdracht Manager</Text>
        <Text htmlFor="nextTaskInput">Volgende opdracht:</Text>
        <Text>{nextTask}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNextTask(text)}
          value={nextTask}
        />
        {/* <Button onPress={handleSendTask} title="Send Task" style={styles.button}  /> */}
        <TouchableOpacity onPress={handleSendTask} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Verzend opdracht</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendTask} style={styles.button}>
          <Text style={styles.buttonText}>Kies random een opdracht</Text>
        </TouchableOpacity>
    </View>
  );
};

export default TaskManager;
