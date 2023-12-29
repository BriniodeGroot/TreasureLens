// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import SecondScreen from './screens/SecondScreen';
import UploadImage from './screens/UploadImage';
import LiveChat from './screens/LiveChat';

const Stack = createNativeStackNavigator();

function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
