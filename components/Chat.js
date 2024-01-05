// ChatComponent.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import styles from '../style';
import { getDatabase, ref, set, push, off, onValue } from "firebase/database";
import { useAppContext } from '../AppContext';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { userData } = useAppContext();
  const isDarkMode = userData.themeDark;

  // Subscribe to the chat messages
  useEffect(() => {
    const db = getDatabase();
    console.log(userData.code);
    const chatRoomId = userData.code; // Replace with your actual chat room ID
    const chatRef = ref(db, `chatRooms/${chatRoomId}/messages`);
    
    const handleSnapshot = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const messageArray = Object.values(data);
        setMessages(messageArray);
      }
    };

    const unsubscribe = onValue(chatRef, handleSnapshot);

    // Unsubscribe when the component unmounts
    return () => {
      off(unsubscribe);
    };
  }, []);

  const sendMessage = () => {
    // Check if the message is not empty
    if (newMessage.trim() === '') {
      return;
    }
  
    try {
      // Replace 'room1' with your actual chat room ID
      const chatRoomId = userData.code;

      console.log(chatRoomId);

      let host = '';

      if (userData.host) {
        host = '(host) ';
      }

      // Construct the message data
      const messageData = {
        text: host + userData.username + ': ' + newMessage,
      };

      const timestamp = database.ServerValue.TIMESTAMP.toString();

      const db = getDatabase();
      const newMessageRef = push(ref(db, 'chatRooms/' + chatRoomId + '/messages'));

      setNewMessage('');
      // Set the message data under the unique key
      set(newMessageRef, messageData);
    }

    // oude versie die niet werkte
      
    
    //   // Specify the path to the chat messages for the given chat room
    //   const chatPath = `chats/${chatRoomId}/messages`;

    //   // Get a reference to the database at the specified path
    //   const chatRef = database().ref(chatPath);
    //   //chatRef.setValue(messageData);
    //   console.log(chatRef);
    //     chatRef
    //     .push(messageData)
    //     .then(() => {
    //         console.log('Message sent successfully');
    //     })
    //     .catch((error) => {
    //         console.error('Error sending message:', error);
    //     });
    //   // Clear the input after sending the message
    //   setNewMessage('');
    // } 
    catch (error) {
      console.error('Error preparing or sending message:', error);
    }
  };
  

  return (
    <View style={styles.chatContainer}>
      <FlatList
        data={messages}
        //keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputChat}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity onPress={sendMessage} style = {isDarkMode ? styles.sendButton : styles.lightSendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatComponent;
