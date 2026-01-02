import React, { useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing, withSpring } from 'react-native-reanimated';
import { useGame } from '../context/GameContext';

interface PetAvatarProps {
  moodScore: number;
}

const IMAGES = {
  happy: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjR6cDZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZmZ5ZiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/duNowzaVje6Di/giphy.gif',
  neutral: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3d4M3d4M3d4M3d4M3d4M3d4M3d4M3d4M3d4M3d4M3d4M3d4MyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/l0HlHFRbmaX9obq5W/giphy.gif',
  sad: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Q5Z255bmY5bmY5bmY5bmY5bmY5bmY5bmY5bmY5bmY5bmY5ZiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/OPU6pZ2CV29Zm/giphy.gif'
};

import { ViewStyle, TextStyle, DimensionValue } from 'react-native';

type AccessoryStyle = {
    emoji: string;
    style: TextStyle;
};

const ACCESSORIES: Record<string, AccessoryStyle> = {
    tea: { emoji: '🍵', style: { bottom: 10, right: 20, fontSize: 50, transform: [{rotate: '0deg'}] } },
    blanket: { emoji: '🧣', style: { bottom: 0, left: '50%' as DimensionValue, marginLeft: -40, fontSize: 80 } },
    headphones: { emoji: '🎧', style: { top: '25%' as DimensionValue, left: '50%' as DimensionValue, marginLeft: -50, fontSize: 90, transform: [{rotate: '10deg'}] } },
};

export const PetAvatar: React.FC<PetAvatarProps> = ({ moodScore }) => {
  const { accessory } = useGame();
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

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
    transform: [{ scale: scale.value }, { translateY: translateY.value }]
  }));

  const accConfig = ACCESSORIES[accessory as keyof typeof ACCESSORIES];

  return (
    <Animated.View style={[animatedStyle, { width: 288, height: 288, position: 'relative' }]}>
       <Image
         source={{ uri: IMAGES[mood] }}
         style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
         resizeMethod="resize"
       />
       {accConfig && (
           <Text style={[{ position: 'absolute', zIndex: 10 }, accConfig.style]}>
               {accConfig.emoji}
           </Text>
       )}
    </Animated.View>
  );
};
