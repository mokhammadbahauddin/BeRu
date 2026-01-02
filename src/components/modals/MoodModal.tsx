import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { GlassPanel } from '../GlassPanel';
import { JuicyButton } from '../JuicyButton';
import { useGame } from '../../context/GameContext';
import * as Haptics from 'expo-haptics';

interface MoodModalProps {
  visible: boolean;
  onClose: () => void;
}

const MOODS = [
  { score: 100, label: 'Happy', emoji: '😄', color: 'bg-green-50', border: 'hover:border-green-300' },
  { score: 80, label: 'Semangat', emoji: '🤩', color: 'bg-orange-50', border: 'hover:border-orange-300' },
  { score: 50, label: 'Biasa', emoji: '😐', color: 'bg-yellow-50', border: 'hover:border-yellow-300' },
  { score: 20, label: 'Sedih', emoji: '😔', color: 'bg-blue-50', border: 'hover:border-blue-300' },
  { score: 10, label: 'Cemas', emoji: '😰', color: 'bg-purple-50', border: 'hover:border-purple-300' },
  { score: 0, label: 'Marah', emoji: '😡', color: 'bg-red-50', border: 'hover:border-red-300' },
];

export const MoodModal: React.FC<MoodModalProps> = ({ visible, onClose }) => {
  const { logMood } = useGame();

  const handleMoodSelect = (score: number) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    logMood(score);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-sky-900/80">
            <TouchableWithoutFeedback>
                <Animated.View
                    entering={ZoomIn.duration(300)}
                    exiting={ZoomOut.duration(300)}
                    className="w-full max-w-sm"
                >
                    <View className="bg-white m-6 rounded-[40px] p-8 border-8 border-white shadow-2xl items-center">
                        <Text className="text-3xl font-bold text-gray-800 mb-2 font-cute">Apa Kabar Hati?</Text>
                        <Text className="text-gray-500 mb-8 text-sm font-medium">Pilih yang paling mewakili perasaanmu.</Text>

                        <View className="flex-row flex-wrap justify-between gap-4">
                            {MOODS.map((mood) => (
                                <JuicyButton
                                    key={mood.label}
                                    onPress={() => handleMoodSelect(mood.score)}
                                    className={`w-[30%] aspect-square ${mood.color} rounded-2xl items-center justify-center border-2 border-transparent`}
                                >
                                    <Text className="text-4xl mb-1">{mood.emoji}</Text>
                                    <Text className="text-[10px] font-bold text-gray-700 uppercase">{mood.label}</Text>
                                </JuicyButton>
                            ))}
                        </View>

                        <TouchableOpacity onPress={onClose} className="mt-8">
                            <Text className="text-gray-400 font-bold text-sm tracking-widest uppercase">Nanti Dulu</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
