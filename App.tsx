import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import {
  Fredoka_300Light, Fredoka_400Regular, Fredoka_500Medium, Fredoka_600SemiBold, Fredoka_700Bold
} from '@expo-google-fonts/fredoka';
import {
  Quicksand_300Light, Quicksand_400Regular, Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_700Bold
} from '@expo-google-fonts/quicksand';
import { VT323_400Regular } from '@expo-google-fonts/vt323';
import { PatrickHand_400Regular } from '@expo-google-fonts/patrick-hand';
import { GameProvider } from './src/context/GameContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          Fredoka_300Light, Fredoka_400Regular, Fredoka_500Medium, Fredoka_600SemiBold, Fredoka_700Bold,
          Quicksand_300Light, Quicksand_400Regular, Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_700Bold,
          VT323_400Regular,
          PatrickHand_400Regular,
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0F2FE' }}>
        <ActivityIndicator size="large" color="#38BDF8" />
        <Text style={{ marginTop: 20, color: '#0C4A6E' }}>Loading Bebek Biru...</Text>
      </View>
    );
  }

  return (
    <GameProvider>
      <HomeScreen />
    </GameProvider>
  );
}
