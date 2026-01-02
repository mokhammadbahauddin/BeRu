export interface Notification {
  id: number;
  text: string;
  read: boolean;
}

export type Mood = 'happy' | 'neutral' | 'sad';

export interface GameState {
  coins: number;
  streak: number;
  moodScore: number;
  inventory: string[];
  accessory: string;
  lastDaily: number;
  gratitudeList: string[];
  lastMoodCheckin: number;
  notifications: Notification[];
}

export interface GameContextType extends GameState {
  addNotification: (msg: string) => void;
  logMood: (score: number) => void;
  buyAccessory: (item: string, cost: number) => boolean;
  saveGratitude: (text: string) => void;
  interact: (type: 'pet' | 'feed' | 'hug') => void;
  claimDaily: () => void;
  watchAd: () => void;
}
