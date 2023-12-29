// ChatComponent.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import styles from '../style';
import { getDatabase, ref, set, push } from "firebase/database";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Subscribe to the chat messages
    const chatRef = database().ref('chats/default/messages');
    const onValueChange = chatRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const messageArray = Object.values(data);
        setMessages(messageArray);
      }
    });

    // Unsubscribe when the component unmounts
    return () => chatRef.off('value', onValueChange);
  }, []);

  const sendMessage = () => {
    // Check if the message is not empty
    if (newMessage.trim() === '') {
      return;
    }
  
    try {
      // Replace 'room1' with your actual chat room ID
      const chatRoomId = 'room1';

      // Construct the message data
      const messageData = {
        text: newMessage,
      };

      const timestamp = database.ServerValue.TIMESTAMP.toString();

      const db = getDatabase();
      const newMessageRef = push(ref(db, 'chatRooms/' + chatRoomId + '/messages'));

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
        keyExtractor={(item) => item.timestamp.toString()}
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
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatComponent;
