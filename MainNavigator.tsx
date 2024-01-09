// MainNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import GenerateCodeScreen from './screens/GenerateCode';
import EnterGameRoomScreen from './screens/EnterGameRoom';
import Settingsscreen from './screens/Settings';
import GameBottomTabNavigator from './GameBottomTabNavigator';
import ScoringScreen from './screens/Scoring';
import Header from './components/Header';
import HeaderHome from './components/HeaderHome';
import HeaderGame from './components/HeaderGame';

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} 
      options={{
        header: () => (
          <HeaderHome></HeaderHome>
        )
      }}
      />
      <Stack.Screen name="GenerateCode" component={GenerateCodeScreen} 
      options={{
        header: () => (
          <Header></Header>
        )
      }}
      />
      <Stack.Screen name="EnterGameRoom" component={EnterGameRoomScreen} 
      options={{
        header: () => (
          <Header></Header>
        )
      }}
      />
      <Stack.Screen name="Settings" component={Settingsscreen} 
      />
      <Stack.Screen name="Scoring" component={ScoringScreen} 
      options={{
        header: () => (
          <HeaderGame></HeaderGame>
        )
      }}
      />
      <Stack.Screen name="Game" component={GameBottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
