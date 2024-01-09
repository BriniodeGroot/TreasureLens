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
  const isDarkMode = userData.themeDark;

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
    <View style={styles.hostTaskContainer}>
        
        <TextInput
          style = {[isDarkMode ? styles.inputDark : styles.inputLight, {marginBottom: 10, justifyContent: 'center'}]}
          onChangeText={(text) => setNextTask(text)}
          value={nextTask}
          placeholder="Typ hier je opdracht"
          placeholderTextColor={'grey'}
        />
        {/* <Button onPress={handleSendTask} title="Send Task" style={styles.button}  /> */}
        <View style={styles.createCodeContainer}>
          {availablePrompts.length > 0 ? (
            <TouchableOpacity onPress={handleSendRandomTask} style={isDarkMode ? styles.buttonSecondary : styles.lightButton}>
              <Text style={isDarkMode ? styles.buttonText : styles.lightButtonText}>Random opdracht</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.text}>De voorgemaakte opdrachten zijn op, wees creatief en verzin toffe opdrachten!</Text>
          )}
          <TouchableOpacity onPress={handleSendTask} style = {isDarkMode ? styles.button : styles.lightSendButton}>
            <Text style = {isDarkMode ? styles.buttonText : styles.lightButtonText}>Verstuur</Text>
          </TouchableOpacity>
        </View>  
    </View>
  );
};

export default TaskManager;
