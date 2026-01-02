import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
  Easing
} from 'react-native-reanimated';
import { Heart, Star, Sparkles, CircleDollarSign } from 'lucide-react-native';

interface ParticleProps {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'star' | 'sparkle' | 'coin';
  onComplete: (id: number) => void;
}

const Particle: React.FC<ParticleProps> = ({ id, x, y, type, onComplete }) => {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const rotate = useSharedValue(0);

  useEffect(() => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 50 + Math.random() * 100;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist - 150; // Fly up bias

    translateX.value = withTiming(tx, { duration: 1000, easing: Easing.out(Easing.quad) });
    translateY.value = withTiming(ty, { duration: 1000, easing: Easing.out(Easing.quad) });
    opacity.value = withTiming(0, { duration: 1000 }, (finished) => {
      if (finished) {
        runOnJS(onComplete)(id);
      }
    });
    scale.value = withTiming(0, { duration: 1000 });
    rotate.value = withTiming(Math.random() * 360, { duration: 1000 });
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` }
    ],
    position: 'absolute',
    left: x,
    top: y,
  }));

  const renderIcon = () => {
    switch (type) {
      case 'heart': return <Heart size={24} color="#F472B6" fill="#F472B6" />;
      case 'star': return <Star size={24} color="#A78BFA" fill="#A78BFA" />;
      case 'sparkle': return <Sparkles size={24} color="#FDE047" fill="#FDE047" />;
      case 'coin': return <CircleDollarSign size={24} color="#EAB308" fill="#EAB308" />;
      default: return <Heart size={24} color="#F472B6" />;
    }
  };

  return <Animated.View style={style}>{renderIcon()}</Animated.View>;
};

interface ParticleSystemProps {
  particles: { id: number; x: number; y: number; type: string }[];
  onComplete: (id: number) => void;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ particles, onComplete }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map(p => (
        <Particle
          key={p.id}
          id={p.id}
          x={p.x}
          y={p.y}
          type={p.type as any}
          onComplete={onComplete}
        />
      ))}
    </View>
  );
};
