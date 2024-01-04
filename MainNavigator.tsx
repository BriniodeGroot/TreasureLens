// MainNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import GenerateCodeScreen from './screens/GenerateCode';
import EnterGameRoomScreen from './screens/EnterGameRoom';
import GameBottomTabNavigator from './GameBottomTabNavigator';

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GenerateCode" component={GenerateCodeScreen} />
      <Stack.Screen name="EnterGameRoom" component={EnterGameRoomScreen} />
      <Stack.Screen name="Game" component={GameBottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
