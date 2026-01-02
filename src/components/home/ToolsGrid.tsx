import React from 'react';
import { View, Text } from 'react-native';
import { JuicyButton } from '../JuicyButton';
import { Sparkles } from 'lucide-react-native';

interface ToolsGridProps {
  onOpenGratitude: () => void;
  onOpenBreathing: () => void;
  onOpenShop: () => void;
  onMagic: () => void;
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({ onOpenGratitude, onOpenBreathing, onOpenShop, onMagic }) => {
  return (
    <View className="flex-row flex-wrap justify-center gap-4 mt-8 w-full px-4 mb-4">
       <JuicyButton className="w-[22%] aspect-square bg-orange-100 border-b-4 border-orange-200 rounded-3xl items-center justify-center" onPress={onOpenGratitude}>
          <Text className="text-3xl mb-1">🍯</Text>
          <Text className="text-[10px] font-bold text-orange-800 uppercase font-ui">Syukur</Text>
       </JuicyButton>
       <JuicyButton className="w-[22%] aspect-square bg-teal-100 border-b-4 border-teal-200 rounded-3xl items-center justify-center" onPress={onOpenBreathing}>
          <Text className="text-3xl mb-1">🌬️</Text>
          <Text className="text-[10px] font-bold text-teal-800 uppercase font-ui">Napas</Text>
       </JuicyButton>
       <JuicyButton className="w-[22%] aspect-square bg-pink-100 border-b-4 border-pink-200 rounded-3xl items-center justify-center" onPress={onOpenShop}>
          <Text className="text-3xl mb-1">🛋️</Text>
          <Text className="text-[10px] font-bold text-pink-800 uppercase font-ui">Pojok</Text>
       </JuicyButton>
       <JuicyButton className="w-[22%] aspect-square bg-purple-100 border-b-4 border-purple-200 rounded-3xl items-center justify-center" onPress={onMagic}>
          <Sparkles size={28} color="#6B21A8" className="mb-1" />
          <Text className="text-[10px] font-bold text-purple-800 uppercase font-ui">Saran</Text>
       </JuicyButton>
    </View>
  );
};
