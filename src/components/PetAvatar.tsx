import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing } from 'react-native-reanimated';
import { Mood } from '../types';

interface PetAvatarProps {
  moodScore: number;
}

const IMAGES = {
  happy: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjR6cDZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/duNowzaVje6Di/giphy.gif',
  neutral: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3d4M3d4M3d4M3d4M3d4M3d4M3d4M3d4M3d4M3d4M3d4M3d4MyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/l0HlHFRbmaX9obq5W/giphy.gif',
  sad: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Q5Z255bmY5bmY5bmY5bmY5bmY5bmY5bmY5bmY5bmY5bmY5ZiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/OPU6pZ2CV29Zm/giphy.gif'
};

export const PetAvatar: React.FC<PetAvatarProps> = ({ moodScore }) => {
  const scale = useSharedValue(1);

  // Determine mood string
  let mood: 'happy' | 'neutral' | 'sad' = 'neutral';
  if (moodScore > 70) mood = 'happy';
  else if (moodScore < 30) mood = 'sad';

  useEffect(() => {
    // Breathing animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // Infinite
      true // Reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <Animated.View style={[animatedStyle, { width: 288, height: 288 }]}>
       <Image
         source={{ uri: IMAGES[mood] }}
         style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
         // Note: For pixel art scaling in RN, we rely on resizeMode or style.
         // RN doesn't have 'imageRendering: pixelated' style prop directly on Image like web,
         // but 'contain' usually works well enough or we might need a specific prop on Android/iOS.
         // resizeMethod="resize" might help on Android.
         resizeMethod="resize"
       />
    </Animated.View>
  );
};
