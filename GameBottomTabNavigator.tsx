// GameBottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LiveChatScreen from './screens/LiveChat';
import UploadImageScreen from './screens/UploadImage';
import VotingScreen from './screens/Voting';
import { useAppContext } from './AppContext';

const Tab = createBottomTabNavigator();

const GameBottomTabNavigator: React.FC = () => {
  const { userData } = useAppContext();
  const isDarkMode = userData.themeDark;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fec671', // Color of the active tab
        tabBarInactiveTintColor: isDarkMode ? 'white' : 'black', // Color of inactive tabs
        tabBarStyle: {
          backgroundColor: isDarkMode ? 'black' : 'white', // Background color of the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 16, // Font size of the tab labels
        },
      }}
    >
      <Tab.Screen name="Upload" component={UploadImageScreen} />
      <Tab.Screen name="Stem" component={VotingScreen} />
      <Tab.Screen name="Live Chat" component={LiveChatScreen} />
    </Tab.Navigator>
  );
};

export default GameBottomTabNavigator;
