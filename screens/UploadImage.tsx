import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView, FlatList, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { getDatabase, ref, push, off, onValue, Query, set } from 'firebase/database';
import { useAppContext } from '../AppContext';
import styles from '../style';
import HostTask from '../components/HostTask';

const UploadImageScreen: React.FC = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [task, setTask] = useState('Wacht op de eerste opdracht...');
  const { userData, storeLastTask } = useAppContext();
  const isDarkMode = userData.themeDark;
  const [showTopPlayers, setShowTopPlayers] = useState(false);
  const [topPlayers, setTopPlayers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
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
        }
      }
    };

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
            setShowTopPlayers(true);
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
    try {
      if (!imageUri) {
        Alert.alert('Select an image first!');
        return;
      }

      const response = await fetch(imageUri);
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

      ToastAndroid.show('Image Uploaded Successfully!', ToastAndroid.SHORT);

      setImageUri(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error uploading image. Please try again.');
    }
  };

  const renderContent = () => {
    if (showTopPlayers) {
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
            <Image source={require('../images/logo.jpg')} style={{ width: 50, height: 50, marginTop: 5, borderRadius: 10 }} />
            <TouchableOpacity
              onPress={handleEndGame}
              style={[isDarkMode ? styles.button : styles.lightButton, { marginBottom: 20, display: userData.host ? 'flex' : 'none' },]}>
              <Text style={styles.buttonText}>Beindig het spel</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Upload hier je foto voor de opdracht</Text>
            <Text style={[isDarkMode ? styles.buttonSecondary : styles.lightButtonSecondary, { color: '#000000', marginBottom: 20, fontSize: 20 }]}>{task}</Text>
            {userData.host ? (<HostTask />) : null}
            <TouchableOpacity onPress={handleCameraLaunch} style={isDarkMode ? styles.button : styles.lightButton}>
              <Text style={styles.buttonText}>Launch Camera</Text>
              </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
            <Text onPress={uploadImage} disabled={!imageUri} style={[isDarkMode ? styles.buttonThird : styles.lightButtonThird, { color: 'white' }]}>Upload image</Text>
            <TouchableOpacity onPress={handleNavigateToLiveChat} style={[isDarkMode ? styles.button : styles.lightButton, { marginTop: 300 }]}>
              <Text style={styles.buttonText}>Ga naar live chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigate} style={isDarkMode ? styles.button : styles.lightButton}>
              <Text style={styles.buttonText}>Ga terug naar home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  };

  return renderContent();
};

export default UploadImageScreen;