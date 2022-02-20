import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View } from 'react-native';
import PageHeader from '../../Components/PageHeader';
import { Teacher, TeacherItem } from '../../Components/TeacherItem';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

export function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('@favorites_proffy');
      if (value !== null) {
        setFavorites(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  useFocusEffect(() => {
    loadFavorites();
  });
  return (
    <View style={styles.container}>
      <PageHeader title='Meus proffys favoritos' />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {favorites.map((favorite: Teacher) => (
          <TeacherItem key={favorite.id} teacher={favorite} favorited />
        ))}
      </ScrollView>
    </View>
  );
}
