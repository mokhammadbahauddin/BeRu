import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    Easing,
    FadeIn,
    FadeOut
} from 'react-native-reanimated';
import { useGame } from '../../context/GameContext';

interface BreathingModalProps {
  visible: boolean;
  onClose: () => void;
}

export const BreathingModal: React.FC<BreathingModalProps> = ({ visible, onClose }) => {
  const { coins } = useGame(); // Could award coins here
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0.1);

  const [phase, setPhase] = useState<'TARIK' | 'TAHAN' | 'HEMBUS'>('TARIK');
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    if (visible) {
        let t = 0;
        const interval = setInterval(() => {
            t = (t + 1) % 3;
            setTimer(4);
            if (t === 0) setPhase('TARIK');
            else if (t === 1) setPhase('TAHAN');
            else setPhase('HEMBUS');
        }, 4000);

        // Animation Loop
        scale.value = withRepeat(
            withSequence(
                withTiming(1.5, { duration: 4000, easing: Easing.inOut(Easing.ease) }), // Inhale
                withTiming(1.5, { duration: 4000 }), // Hold
                withTiming(0.5, { duration: 4000, easing: Easing.inOut(Easing.ease) }) // Exhale
            ), -1, false
        );
        opacity.value = withRepeat(
            withSequence(
                withTiming(0.3, { duration: 4000 }),
                withTiming(0.3, { duration: 4000 }),
                withTiming(0.1, { duration: 4000 })
            ), -1, false
        );

        return () => clearInterval(interval);
    } else {
        scale.value = 0.5;
        opacity.value = 0.1;
    }
  }, [visible]);

  useEffect(() => {
      if(visible) {
          const countdown = setInterval(() => {
              setTimer(prev => prev > 1 ? prev - 1 : 4);
          }, 1000);
          return () => clearInterval(countdown);
      }
  }, [visible, phase]);

  const circleStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value
  }));

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
        <View className="flex-1 items-center justify-center bg-teal-950">
             <Text className="text-teal-200/80 text-xl font-hand mb-8 tracking-widest uppercase">Fokus pada napasmu...</Text>

             <View className="relative w-80 h-80 items-center justify-center mb-12">
                 {/* Decorative Rings */}
                 <View className="absolute w-full h-full border border-teal-500/20 rounded-full" />

                 {/* Animated Circle */}
                 <Animated.View className="absolute w-full h-full bg-teal-500 rounded-full" style={circleStyle} />

                 <View className="items-center z-10">
                     <Text className="text-white text-6xl font-bold font-ui mb-2">{phase}</Text>
                     <Text className="text-teal-400 text-lg font-mono">{timer}s</Text>
                 </View>
             </View>

             <TouchableOpacity
                onPress={onClose}
                className="mt-8 border border-white/20 px-8 py-3 rounded-full"
             >
                 <Text className="text-white/60 font-bold uppercase text-xs tracking-widest">Saya Sudah Tenang</Text>
             </TouchableOpacity>
        </View>
    </Modal>
  );
};
