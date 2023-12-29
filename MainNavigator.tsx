// MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import SecondScreen from './screens/SecondScreen';
import UploadImage from './screens/UploadImage';
import LiveChat from './screens/LiveChat';
import GenerateCode from './screens/GenerateCode';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SecondScreen" component={SecondScreen} />
      <Tab.Screen name="UploadImage" component={UploadImage} />
      <Tab.Screen name="LiveChat" component={LiveChat} />
      <Tab.Screen name="GenerateCode" component={GenerateCode} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
