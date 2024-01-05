import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useAppContext } from '../AppContext';
import styles from '../style';

const ScoringScreen: React.FC = () => {
  const navigation = useNavigation();
  const { userData } = useAppContext();
  const isDarkMode = userData.themeDark;

  const [players, setPlayers] = useState([]);

  useEffect(() => {
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

        // Sort the players array by score in descending order
        const sortedPlayers = playerArray.sort((a, b) => b.score - a.score);

        setPlayers(sortedPlayers);
      }
    };

    const unsubscribe = onValue(playersRef, handleSnapshot);

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, [userData.code]);

  return (
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
      <Image source={require('../images/logo.jpg')} style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10 }} />
      <Text style={styles.text}>Player Scores:</Text>
      <FlatList
        data={players}
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
};

export default ScoringScreen;