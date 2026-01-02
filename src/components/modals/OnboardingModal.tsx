import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useGame } from '../../context/GameContext';
import { JuicyButton } from '../JuicyButton';
import { ArrowRight } from 'lucide-react-native';

interface OnboardingModalProps {
  visible: boolean;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ visible }) => {
  const { completeOnboarding } = useGame();

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent>
        <View className="flex-1 bg-sky-900/90 justify-center items-center p-8">
            <View className="bg-white w-full rounded-[40px] p-8 items-center shadow-2xl border-4 border-sky-200">
                <Text className="text-6xl mb-4">🦆</Text>
                <Text className="text-3xl font-bold text-sky-800 font-cute mb-2">Halo, Teman!</Text>
                <Text className="text-center text-gray-500 font-ui leading-relaxed mb-8">
                    Aku <Text className="font-bold text-sky-500">Bebek Biru</Text>.{"\n"}
                    Aku di sini untuk menemani hari-harimu. Kita bisa ngobrol, main, dan menjaga kesehatan mental bareng-bareng!
                </Text>

                <JuicyButton
                    onPress={completeOnboarding}
                    className="bg-sky-500 w-full py-4 rounded-2xl flex-row justify-center items-center gap-2 shadow-lg"
                >
                    <Text className="text-white font-bold text-lg font-ui">Mulai Berteman</Text>
                    <ArrowRight color="white" size={24} />
                </JuicyButton>
            </View>
        </View>
    </Modal>
  );
};
