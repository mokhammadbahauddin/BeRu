import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PetAvatar } from '../PetAvatar';
import { JuicyButton } from '../JuicyButton';
import { useGame } from '../../context/GameContext';
import * as Haptics from 'expo-haptics';

interface PetDisplayProps {
  onInteract: (type: 'pet' | 'feed' | 'hug') => void;
  onPetPress: (event: any) => void;
}

export const PetDisplay: React.FC<PetDisplayProps> = ({ onInteract, onPetPress }) => {
  const { moodScore, speechText } = useGame();
  const [showInteractionMenu, setShowInteractionMenu] = useState(false);
  const [interactionMenuTimer, setInteractionMenuTimer] = useState<NodeJS.Timeout | null>(null);

  const handlePress = (event: any) => {
      if (showInteractionMenu) {
          setShowInteractionMenu(false);
      } else {
          setShowInteractionMenu(true);
          if (interactionMenuTimer) clearTimeout(interactionMenuTimer);
          const timer = setTimeout(() => setShowInteractionMenu(false), 4000);
          setInteractionMenuTimer(timer);
      }
      onPetPress(event);
  };

  const handleInteraction = (type: 'pet' | 'feed' | 'hug') => {
      onInteract(type);
      setShowInteractionMenu(false);
  };

  return (
    <View className="flex-1 justify-center items-center z-0 -mt-10">
        {/* Speech Bubble */}
        <View className="absolute -top-24 bg-white border-4 border-bebek-dark px-6 py-4 rounded-3xl max-w-[85%] z-30 shadow-lg">
            <Text className="text-xl text-bebek-dark text-center font-bold font-hand">{speechText}</Text>
            <View className="absolute -bottom-4 left-1/2 -ml-[12px] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-bebek-dark" />
            <View className="absolute -bottom-[10px] left-1/2 -ml-[8px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white" />
        </View>

        {/* Pet Container */}
        <View className="relative items-center justify-center">
           {showInteractionMenu && (
             <View className="absolute w-full h-48 z-40 flex-row justify-between items-center px-4 -top-8" style={{ width: 300 }}>
                <JuicyButton onPress={() => handleInteraction('pet')} className="bg-white border-4 border-bebek-dark w-16 h-16 rounded-full items-center justify-center shadow-sm">
                   <Text className="text-3xl">👋</Text>
                   <Text className="text-[10px] font-bold text-bebek-dark mt-[-2px] font-ui">ELUS</Text>
                </JuicyButton>
                <JuicyButton onPress={() => handleInteraction('feed')} className="bg-white border-4 border-bebek-dark w-16 h-16 rounded-full items-center justify-center shadow-sm mt-12">
                   <Text className="text-3xl">🍞</Text>
                   <Text className="text-[10px] font-bold text-bebek-dark mt-[-2px] font-ui">MAKAN</Text>
                </JuicyButton>
                <JuicyButton onPress={() => handleInteraction('hug')} className="bg-white border-4 border-pink-500 w-16 h-16 rounded-full items-center justify-center shadow-sm">
                   <Text className="text-3xl">🫂</Text>
                   <Text className="text-[10px] font-bold text-pink-500 mt-[-2px] font-ui">PELUK</Text>
                </JuicyButton>
             </View>
           )}

           <JuicyButton onPress={handlePress} className="active:scale-95">
              <PetAvatar moodScore={moodScore} />
           </JuicyButton>

           {/* Shadow */}
           <View className="absolute bottom-4 w-48 h-12 bg-sky-900/10 rounded-[100%] blur-md z-[-1]" />
        </View>

        {/* Status Label */}
        <View className="mt-6 bg-white/60 px-8 py-2 rounded-full border-2 border-white/80 shadow-sm">
           <Text className="text-xl text-bebek-dark font-bold tracking-widest uppercase font-cute">
              {moodScore > 70 ? 'Tenang' : moodScore < 30 ? 'Sedih' : 'Biasa'}
           </Text>
        </View>
    </View>
  );
};
