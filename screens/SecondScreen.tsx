import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../style';
import { socket } from '../socket';
import { ConnectionState } from '../components/ConnectionState';
import { ConnectionManager } from '../components/ConnectionManager';
import { Events } from "../components/Events";
import { MyForm } from '../components/MyForm';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: any) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  const SecondScreen: React.FC = () => {
    const [currentPrompt, setCurrentPrompt] = useState("");

    const prompts = [
      "Find a yellow object!.",
      "Find a round object!",
      "Find some cutlery!",
      "Find a cuddly bear!",
      "Find sporting equipment!",
      "Find a flower!",
      "Find the coolest rock!",
      "Find the most useful tool!",
      "Find something with a strong scent!",
      "Find a piece of art!",
      "Find a piece of technology!"
    ];

    function getRandomPrompt() {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      return prompts[randomIndex];
    }

    function startNewRound() {
      const randomPrompt = getRandomPrompt();
      setCurrentPrompt(randomPrompt);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is the Second Screen!</Text>
        <Text style={styles.text}>{currentPrompt}</Text>
        <Button title="Start New Round" onPress={startNewRound} />
        <View style={{ flex: 1 }}>
          <ConnectionState isConnected={ isConnected } />
          <Events events={ fooEvents } />
          <ConnectionManager />
          <MyForm />
        </View>
      </View>
    );
  };

  return <SecondScreen />;
};

export default App;
