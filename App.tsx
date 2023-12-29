// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './AppContext';
import MainNavigator from './MainNavigator';
import Home from './screens/Home';
import SecondScreen from './screens/SecondScreen';
import UploadImage from './screens/UploadImage';
import LiveChat from './screens/LiveChat';
import GenerateCode from './screens/GenerateCode';
import styles from './style';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import EnterScreen from './screens/EnterGameRoom';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen 
          name="Home"
          component={Home} 
          options={{
            headerStyle: {
            backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              },
          }}
          />
        <Stack.Screen 
          name="SecondScreen" 
          component={SecondScreen} 
          options={{
            headerStyle: {
            backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              },
          }}
          />
        <Stack.Screen 
          name="UploadImage" 
          component={UploadImage} 
          options={{
            headerStyle: {
            backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              },
          }}
          />
        <Stack.Screen 
          name="LiveChat" 
          component={LiveChat} 
          options={{
            headerStyle: {
            backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              },
          }}
          />
          <Stack.Screen 
          name="GenerateCode" 
          component={GenerateCode} 
          options={{
            headerStyle: {
            backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              },
          }}
          />
          <Stack.Screen 
          name="EnterScreen" 
          component={EnterScreen} 
          options={{
            headerStyle: {
            backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              },
          }}
          />
        </Stack.Navigator>
        {/* <MainNavigator /> */}
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
