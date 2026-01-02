import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState, GameContextType, Notification } from '../types';

const STATE_KEY = 'bebek_mental_health_v4_ultra';

const defaultState: GameState = {
  coins: 0,
  streak: 0,
  moodScore: 50,
  inventory: [],
  accessory: 'none',
  lastDaily: 0,
  gratitudeList: [],
  lastMoodCheckin: 0,
  notifications: []
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadState();
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

  const addNotification = (msg: string) => {
    setState(prev => {
      const newNotifs = [{ id: Date.now(), text: msg, read: false }, ...prev.notifications].slice(0, 5);
      return { ...prev, notifications: newNotifs };
    });
  };

  const logMood = (score: number) => {
    setState(prev => ({
      ...prev,
      moodScore: score,
      lastMoodCheckin: Date.now(),
      streak: prev.streak + 1,
      coins: prev.coins + 20
    }));
    addNotification("Mood check-in saved! +20 coins");
  };

  const buyAccessory = (item: string, cost: number): boolean => {
    if (state.inventory.includes(item)) {
        // Toggle accessory if already owned
        setState(prev => ({
            ...prev,
            accessory: prev.accessory === item ? 'none' : item
        }));
        return true;
    }

    if (state.coins >= cost) {
      setState(prev => ({
        ...prev,
        coins: prev.coins - cost,
        inventory: [...prev.inventory, item],
        accessory: item
      }));
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
  };

  if (!loaded) return null;

  return (
    <GameContext.Provider value={{
      ...state,
      addNotification,
      logMood,
      buyAccessory,
      saveGratitude,
      interact,
      claimDaily,
      watchAd
    }}>
      {children}
    </GameContext.Provider>
  );
};
