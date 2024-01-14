// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './AppContext';
import MainNavigator from './MainNavigator';
import { LogBox, YellowBox } from 'react-native';

const App: React.FC = () => {
  if (!__DEV__) {
    // In production mode
    LogBox.ignoreLogs(['Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.']); // Replace with the actual warning message
  }
  if (__DEV__) {
    // In production mode
    LogBox.ignoreLogs(['Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.']); // Replace with the actual warning message
  }
  

  return (
    <AppProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AppProvider>  
  );    
  };

export default App;
