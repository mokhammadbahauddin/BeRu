import React from 'react';
import { View, Text } from 'react-native';
import { Bell, CircleDollarSign, Settings, Flame } from 'lucide-react-native';
import { GlassPanel } from '../GlassPanel';
import { JuicyButton } from '../JuicyButton';
import { useGame } from '../../context/GameContext';

interface HomeHeaderProps {
  onOpenMood: () => void;
  onOpenSettings: () => void;
  onWatchAd: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ onOpenMood, onOpenSettings, onWatchAd }) => {
  const { coins, streak, moodScore, notifications } = useGame();

  return (
    <View className="flex-row justify-between items-center px-6 pt-4 z-10">
       <View className="flex-row gap-2">
          <JuicyButton className="rounded-2xl shadow-sm" onPress={onOpenMood}>
             <GlassPanel className="p-2 px-4 rounded-2xl flex-col items-center justify-center">
                <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-ui">Mood</Text>
                <Text className="text-2xl font-bold text-gray-800">
                  {moodScore > 70 ? '😄' : moodScore < 30 ? '😔' : '😶'}
                </Text>
             </GlassPanel>
          </JuicyButton>

          {streak > 0 && (
            <View className="bg-orange-100 p-2 px-3 rounded-2xl border-2 border-orange-300 flex-col items-center justify-center ml-2">
                <Text className="text-[10px] font-bold text-orange-600 uppercase tracking-widest font-ui">Streak</Text>
                <View className="flex-row items-center gap-1">
                    <Text className="font-bold text-orange-800 text-xl">{streak}</Text>
                    <Flame color="#ea580c" size={16} />
                </View>
            </View>
          )}
       </View>

       <View className="flex-row gap-2">
          <JuicyButton onPress={onOpenSettings}>
            <GlassPanel className="w-12 h-12 rounded-2xl items-center justify-center">
              <Settings color="#4B5563" size={20} />
            </GlassPanel>
          </JuicyButton>

          <JuicyButton onPress={onWatchAd}>
             <View className="bg-yellow-300 p-2 px-4 rounded-2xl border-2 border-yellow-500 flex-col items-center">
                <Text className="text-[10px] font-bold text-yellow-900 uppercase tracking-widest opacity-70 font-ui">Koin</Text>
                <View className="flex-row items-center gap-1">
                   <Text className="font-pixel text-xl text-yellow-950 leading-none pt-1">{coins}</Text>
                   <CircleDollarSign color="#451a03" size={14} />
                </View>
             </View>
          </JuicyButton>
       </View>
    </View>
  );
};
