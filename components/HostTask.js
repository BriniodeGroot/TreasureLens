import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import styles from '../style';
import { getDatabase, ref, set, push, off, onValue } from "firebase/database";
import { useAppContext } from '../AppContext';

const TaskManager = () => {

  const prompts = [
    "Vind een geel object!.",
    "Vind een rond object!",
    "Vind bestek!",
    "Vind een coole knuffel!",
    "Vind sportuitrusting!",
    "Vind een bloem!",
    "Vind de coolste steen!",
    "Vind een nuttige tool!",
    "Vind iets met een sterke geur!",
    "Vind een kunstwerk!",
    "Vind een futuristisch technologisch voorwerp!"
  ];

  const [nextTask, setNextTask] = useState('');
  const [availablePrompts, setAvailablePrompts] = useState([...prompts]);
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

  function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * availablePrompts.length);
    const selectedPrompt = availablePrompts[randomIndex];
  
    // Remove the selected prompt from the array
    const updatedPrompts = [...availablePrompts.slice(0, randomIndex), ...availablePrompts.slice(randomIndex + 1)];
    
    setAvailablePrompts(updatedPrompts);
  
    return selectedPrompt;
  }

  const handleSendRandomTask = () => {
    
    const messageData = {
      text: getRandomPrompt(),
    };

    const code = userData.code;

    const db = getDatabase();
    const newMessageRef = push(ref(db, 'chatRooms/' + code + '/tasks'));

    set(newMessageRef, messageData);
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
        {availablePrompts.length > 0 ? (
        <TouchableOpacity onPress={handleSendRandomTask} style={styles.button}>
          <Text style={styles.buttonText}>Kies random een opdracht</Text>
        </TouchableOpacity>
      ) : (
        <Text>De voorgemaakte opdrachten zijn op, wees creatief en verzin toffe opdrachten!</Text>
      )}
    </View>
  );
};

export default TaskManager;
