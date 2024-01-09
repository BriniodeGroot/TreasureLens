import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LiveChatScreen from './screens/LiveChat';
import UploadImageScreen from './screens/UploadImage';
import VotingScreen from './screens/Voting';
import { useAppContext } from './AppContext';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderGame from './components/HeaderGame';


const Tab = createBottomTabNavigator();

const GameBottomTabNavigator: React.FC = () => {
  const { userData } = useAppContext();
  const isDarkMode = userData.themeDark;
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'alarm';

          if (route.name === 'Upload') {
            iconName = 'cloud-upload-outline' ;
          } else if (route.name === 'Stem') {
            iconName = 'checkmark-circle-outline';
          } else if (route.name === 'Live Chat') {
            iconName = 'chatbox-ellipses-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fec671', // Color of the active tab
        tabBarInactiveTintColor: isDarkMode ? 'white' : 'black', // Color of inactive tabs
        tabBarStyle: {
          backgroundColor: isDarkMode ? 'black' : 'white', // Background color of the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 14, // Font size of the tab labels
        },
      })}
      // tabBarOptions={{
      //   tabBarActiveTintColor: '#fec671', // Color of the active tab
      //   tabBarInactiveTintColor: isDarkMode ? 'white' : 'black', // Color of inactive tabs
      //   tabBarStyle: {
      //     backgroundColor: isDarkMode ? 'black' : 'white', // Background color of the tab bar
      //   },
      //   tabBarLabelStyle: {
      //     fontSize: 16, // Font size of the tab labels
      //   },
      // }}
    >
      <Tab.Screen name="Upload" component={UploadImageScreen} 
      options={{
        header: () => (
          <HeaderGame></HeaderGame>
        )
      }}
      />
      <Tab.Screen name="Stem" component={VotingScreen} 
      options={{
        header: () => (
          <HeaderGame></HeaderGame>
        )
      }}
      />
      <Tab.Screen name="Live Chat" component={LiveChatScreen}
      options={{
        header: () => (
          <HeaderGame></HeaderGame>
        )
      }}
      />
    </Tab.Navigator>
  );
};

export default GameBottomTabNavigator;
