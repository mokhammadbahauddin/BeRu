import { Audio } from 'expo-av';

// We'll use a placeholder or check if we can actually load assets.
// Since I don't have local assets, I'll structure this to fail gracefully or use remote URLs if possible.
// For now, I'll define the keys and the loading logic.

const SOUNDS = {
  pop: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Placeholder URL
  coin: 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  bgm: null // Maybe later
};

const soundObjects: { [key: string]: Audio.Sound } = {};

export const loadSounds = async () => {
  try {
    for (const [key, uri] of Object.entries(SOUNDS)) {
        if (!uri) continue;
        const { sound } = await Audio.Sound.createAsync({ uri });
        soundObjects[key] = sound;
    }
  } catch (error) {
    console.warn('Failed to load sounds', error);
  }
};

export const playSound = async (key: 'pop' | 'coin' | 'success') => {
  try {
    const sound = soundObjects[key];
    if (sound) {
      await sound.replayAsync();
    }
  } catch (error) {
    // Silent fail is better than crash in UI thread
    console.log('Sound play error', error);
  }
};
