import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState, GameContextType, Notification } from '../types';
import { playSound, loadSounds } from '../services/audio';
import { initAI, getMoodResponse, getMagicActivity } from '../services/ai';

const STATE_KEY = 'bebek_mental_health_v4_ultra';

interface ExtendedGameState extends GameState {
    firstTimeUser?: boolean;
}

const defaultState: ExtendedGameState = {
  coins: 0,
  streak: 0,
  moodScore: 50,
  inventory: [],
  accessory: 'none',
  lastDaily: 0,
  gratitudeList: [],
  lastMoodCheckin: 0,
  notifications: [],
  firstTimeUser: true
};

interface ExtendedGameContextType extends GameContextType {
    speechText: string;
    setSpeechText: (text: string) => void;
    magicActivity: () => void;
    resetData: () => void;
    firstTimeUser: boolean;
    completeOnboarding: () => void;
}

const GameContext = createContext<ExtendedGameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ExtendedGameState>(defaultState);
  const [loaded, setLoaded] = useState(false);
  const [speechText, setSpeechText] = useState("Kwek! Apa kabar hatimu?");

  useEffect(() => {
    loadState();
    loadSounds();
    initAI();
  }, []);

  useEffect(() => {
    if (loaded) {
      saveState();
    }
  }, [state, loaded]);

  const loadState = async () => {
    try {
      const saved = await AsyncStorage.getItem(STATE_KEY);
      if (saved) {
        setState({ ...defaultState, ...JSON.parse(saved) });
      }
    } catch (e) {
      console.error('Failed to load state', e);
    } finally {
      setLoaded(true);
    }
  };

  const saveState = async () => {
    try {
      await AsyncStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state', e);
    }
  };

  const resetData = async () => {
      await AsyncStorage.removeItem(STATE_KEY);
      setState(defaultState);
      setSpeechText("Kwek! Mari mulai lembaran baru.");
  };

  const completeOnboarding = () => {
      setState(prev => ({ ...prev, firstTimeUser: false }));
  };

  const addNotification = (msg: string) => {
    setState(prev => {
      const newNotifs = [{ id: Date.now(), text: msg, read: false }, ...prev.notifications].slice(0, 5);
      return { ...prev, notifications: newNotifs };
    });
  };

  const logMood = async (score: number) => {
    setState(prev => ({
      ...prev,
      moodScore: score,
      lastMoodCheckin: Date.now(),
      streak: prev.streak + 1,
      coins: prev.coins + 20
    }));
    addNotification("Mood check-in saved! +20 coins");
    playSound('coin');

    // AI Response
    let label = 'Neutral';
    if(score > 70) label = 'Happy';
    if(score < 30) label = 'Sad';

    setSpeechText("Hmm... sebentar ya...");
    const reply = await getMoodResponse(label, score);
    setSpeechText(reply);
  };

  const magicActivity = async () => {
      playSound('pop');
      setSpeechText("Mencari ide seru...");
      const activity = await getMagicActivity(state.moodScore);
      setSpeechText(`💡 ${activity}`);
      addNotification(`Saran: ${activity}`);
  };

  const buyAccessory = (item: string, cost: number): boolean => {
    if (state.inventory.includes(item)) {
        // Toggle accessory if already owned
        setState(prev => ({
            ...prev,
            accessory: prev.accessory === item ? 'none' : item
        }));
        playSound('pop');
        setSpeechText(state.accessory === item ? "Dilepas dulu ya." : "Wah, pas banget!");
        return true;
    }

    if (state.coins >= cost) {
      setState(prev => ({
        ...prev,
        coins: prev.coins - cost,
        inventory: [...prev.inventory, item],
        accessory: item
      }));
      playSound('success');
      setSpeechText("Makasih! Aku suka ini!");
      return true;
    }
    return false;
  };

  const saveGratitude = (text: string) => {
    if (!text.trim()) return;
    setState(prev => ({
      ...prev,
      gratitudeList: [text.trim(), ...prev.gratitudeList].slice(0, 20),
      coins: prev.coins + 15
    }));
    playSound('coin');
    setSpeechText("Alhamdulillah... senangnya mendengarnya.");
  };

  const interact = (type: 'pet' | 'feed' | 'hug') => {
    setState(prev => {
      let newMood = prev.moodScore;
      let newCoins = prev.coins;

      if (type === 'pet') {
        newMood = Math.min(100, prev.moodScore + 5);
      } else if (type === 'feed') {
        newCoins = Math.max(0, prev.coins - 5);
      } else if (type === 'hug') {
        newMood = Math.min(100, prev.moodScore + 10);
      }

      return { ...prev, moodScore: newMood, coins: newCoins };
    });
    playSound('pop');
  };

  const claimDaily = () => {
     const now = Date.now();
     if (now - state.lastDaily > 24 * 60 * 60 * 1000) {
         setState(prev => ({
             ...prev,
             lastDaily: now,
             coins: prev.coins + 50
         }));
         return true;
     }
     return false;
  };

  const watchAd = () => {
      setState(prev => ({ ...prev, coins: prev.coins + 50 }));
      playSound('coin');
      setSpeechText("Cuan cuan cuan! 💰");
  };

  if (!loaded) return null;

  return (
    <GameContext.Provider value={{
      ...state,
      firstTimeUser: state.firstTimeUser ?? true,
      addNotification,
      logMood,
      buyAccessory,
      saveGratitude,
      interact,
      claimDaily,
      watchAd,
      speechText,
      setSpeechText,
      magicActivity,
      resetData,
      completeOnboarding
    }}>
      {children}
    </GameContext.Provider>
  );
};
