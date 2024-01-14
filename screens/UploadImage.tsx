import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView, FlatList, ToastAndroid, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { getDatabase, ref, push, off, onValue, Query, set, get } from 'firebase/database';
import { useAppContext } from '../AppContext';
import styles from '../style';
import HostTask from '../components/HostTask';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const UploadImageScreen: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [task, setTask] = useState('Wacht op de eerste opdracht...');
  const { userData, storeLastTask, storeGameEnded } = useAppContext();
  const isDarkMode = userData.themeDark;
  const [showTopPlayers, setShowTopPlayers] = useState(false);
  const [topPlayers, setTopPlayers] = useState([]);
  const [isTabBarVisible, setTabBarVisible] = useState(true);
  const [cameraDisabled, setCameraDisabled] = useState(false);

  useLayoutEffect(() => {
    
    navigation.setOptions({
      headerShown: true,
      tabBarVisible: isTabBarVisible,
      
      
    });
    console.log('TabBarVisible:', isTabBarVisible);
  }, [isTabBarVisible, navigation]);

  useEffect(() => {
    const backAction = () => {
      // Disable the back button functionality
      return true; // Return true to prevent default behavior (exit the app)
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    const db = getDatabase();
    const chatRoomId = userData.code;
    const chatRef: Query = ref(db, `chatRooms/${chatRoomId}/tasks`);

    const handleSnapshot = (snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const tasks = Object.values(data);

        if (tasks.length > 0) {
          const lastTask = tasks[tasks.length - 1];
          const lastTaskText = (lastTask as { text: string }).text;
          setTask(lastTaskText);
          storeLastTask(lastTaskText);
          setCameraDisabled(false);
        }
      }
    };

    const unsubscribe = onValue(chatRef, handleSnapshot);

    return () => {
      backHandler.remove();
      off(unsubscribe);
    };
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const chatRoomId = userData.code;
    const chatRef: Query = ref(db, `chatRooms/${chatRoomId}/gameEnded`);
    const handleSnapshot = (snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const gameEnded = data.value;
        storeGameEnded(gameEnded);
      }
    }
    const unsubscribe = onValue(chatRef, handleSnapshot);

    return () => {
      off(unsubscribe);
    };
  }, []);

  useEffect(() => {
    if (showTopPlayers) {
      const db = getDatabase();
      const playersRef = ref(db, `chatRooms/${userData.code}/players`);

      const handleSnapshot = (snapshot) => {
        if (snapshot.exists()) {
          const playerData = snapshot.val();
          const playerArray = Object.entries(playerData).map(([key, value]) => ({
            key,
            name: value.name,
            score: value.value,
          }));

          const sortedPlayers = playerArray.sort((a, b) => b.score - a.score);
          const topPlayers = sortedPlayers.slice(0, 3);

          setTopPlayers(topPlayers);
        }
      };

      const unsubscribe = onValue(playersRef, handleSnapshot);

      return () => {
        unsubscribe();
      };
    }
  }, [showTopPlayers, userData.code]);

  
  const handleEndGame = () => {
    Alert.alert(
      'Bevestig',
      'Zeker dat je het spel wilt beindigen?',
      [
        {
          text: 'Nee',
          style: 'cancel',
        },
        {
          text: 'Ja',
          onPress: () => {
            setTabBarVisible(false);
            setShowTopPlayers(true);
            const db = getDatabase();
            const gameEndedRef = ref(db, `chatRooms/${userData.code}/gameEnded`);
            get(gameEndedRef).then((snapshot) => {
              if (snapshot.exists()) {
                const gameEnded = snapshot.val()?.value;
                if (!gameEnded) {
                  set(gameEndedRef, { value: true });
                }
              }
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleNavigate = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToLiveChat = () => {
    navigation.navigate('LiveChat');
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUriLibrary = response.uri || response.assets?.[0]?.uri;
        setImageUri(imageUriLibrary);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUriCamera = response.uri || response.assets?.[0]?.uri;
        setImageUri(imageUriCamera);
      }
    });
  };

  const uploadImage = async () => {
    if (cameraDisabled) {
      ToastAndroid.show('U heeft al een foto geuploaded.', ToastAndroid.SHORT);
    } else {
    try {
      if (!imageUri) {
        ToastAndroid.show('Geen foto geselecteerd!', ToastAndroid.SHORT);
        return;
      }

      setCameraDisabled(true);

      const response = await fetch(imageUri);
      setImageUri(null);
      const blob = await response.blob();
      const name = userData.username;
      const fileName = `${name}.jpg`;
      const chatRoomId = userData.code;
      const task = userData.lastTask;
      const storageRef = storage().ref(`images/${chatRoomId}/${task}/${fileName}`);
      await storageRef.put(blob);

      const downloadURL = await storageRef.getDownloadURL();

      const urlData = {
        imageUrl: downloadURL,
        task: userData.lastTask,
        name: userData.username,
      };

      const db = getDatabase();
      const newUrlRef = push(ref(db, `chatRooms/${userData.code}/photos`));

      set(newUrlRef, urlData);

      ToastAndroid.show('Foto uploaden gelukt!', ToastAndroid.SHORT);

      
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Foto uploaden mislukt, probeer opnieuw!');
    }
  };
};

  const renderContent = () => {
    if (userData.gameEnded) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Top Players:</Text>
          <FlatList
            data={topPlayers}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => (
              <View>
                <Text>
                  {index + 1}. {item.name}: {item.score}
                </Text>
              </View>
            )}
          />
        </View>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <View style={styles.createCodeContainer}>
              <Image
                source={require('../images/logo.jpg')}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
              <TouchableOpacity
                onPress={handleEndGame}
                style={[isDarkMode ? [styles.button, {backgroundColor: '#9197AE'}] : [styles.lightButton, { marginBottom: 20, backgroundColor: 'green', display: userData.host ? 'flex' : 'none' }],]}>
                  <Icon name="ban-outline" size={28} color="black" />
                  <Text style={styles.buttonText}>Beindig het spel</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.text]}>Upload hier je foto voor de opdracht</Text>
            <Text style={[isDarkMode ? styles.taskContainer : styles.lightTaskContainer, { color: '#000000', marginBottom: 20, fontSize: 20 }]}>{task}</Text>
            {userData.host ? (<HostTask />) : null}
            <View style={[isDarkMode ? styles.cameraContainer : styles.lightCameraContainer]}>
              <TouchableOpacity onPress={handleCameraLaunch} style={isDarkMode ? styles.button : styles.lightButton}>
                <Icon name="camera-outline" size={28} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={uploadImage} style={isDarkMode ? styles.button : styles.lightButton}>
                <Text style={styles.buttonText}>Verstuur foto</Text>
              </TouchableOpacity>
            </View>

            {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
            
          </View>
        </ScrollView>
      );
    }
  };

  return renderContent();
};


export default UploadImageScreen;