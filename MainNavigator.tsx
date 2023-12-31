// MainNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import GenerateCodeScreen from './screens/GenerateCode';
import EnterGameRoomScreen from './screens/EnterGameRoom';
import Settingsscreen from './screens/Settings';
import GameBottomTabNavigator from './GameBottomTabNavigator';
import ScoringScreen from './screens/Scoring';

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GenerateCode" component={GenerateCodeScreen} />
      <Stack.Screen name="EnterGameRoom" component={EnterGameRoomScreen} />
      <Stack.Screen name="Settings" component={Settingsscreen} />
      <Stack.Screen name="Scoring" component={ScoringScreen} />
      <Stack.Screen name="Game" component={GameBottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
