// GameBottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LiveChatScreen from './screens/LiveChat';
import UploadImageScreen from './screens/UploadImage';
import VotingScreen from './screens/Voting';

const Tab = createBottomTabNavigator();

const GameBottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LiveChat" component={LiveChatScreen} />
      <Tab.Screen name="UploadImage" component={UploadImageScreen} />
      <Tab.Screen name="Voting" component={VotingScreen} />
    </Tab.Navigator>
  );
};

export default GameBottomTabNavigator;
