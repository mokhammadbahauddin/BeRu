import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions, Modal } from 'react-native';
import { useGame } from '../context/GameContext';
import { GlassPanel } from '../components/GlassPanel';
import { JuicyButton } from '../components/JuicyButton';
import { PetAvatar } from '../components/PetAvatar';
import { ParticleSystem } from '../components/ParticleSystem';
import { Bell, CircleDollarSign, Gift, HeartHandshake, Hand, Utensils, Smile, Wind, Armchair, Sparkles, Flame } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { coins, streak, moodScore, logMood, interact, notifications, inventory, accessory, buyAccessory, saveGratitude, watchAd } = useGame();

  const [particles, setParticles] = useState<{ id: number; x: number; y: number; type: string }[]>([]);
  const [showInteractionMenu, setShowInteractionMenu] = useState(false);
  const [interactionMenuTimer, setInteractionMenuTimer] = useState<NodeJS.Timeout | null>(null);

  const spawnParticles = (count: number, type: string, x: number, y: number) => {
    const newParticles: { id: number; x: number; y: number; type: string }[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({ id: Date.now() + i, x, y, type });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const handleParticleComplete = (id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  };

  const handlePetPress = (event: any) => { // Using simple press for now, could be Gesture Handler tap
    const { locationX, locationY, pageX, pageY } = event.nativeEvent;
    // Toggle interaction menu
    if (showInteractionMenu) {
        setShowInteractionMenu(false);
    } else {
        setShowInteractionMenu(true);
        // Auto hide after 4s
        if (interactionMenuTimer) clearTimeout(interactionMenuTimer);
        const timer = setTimeout(() => setShowInteractionMenu(false), 4000);
        setInteractionMenuTimer(timer);
    }
  };

  const handleInteraction = (type: 'pet' | 'feed' | 'hug') => {
    interact(type);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    spawnParticles(10, type === 'feed' ? 'crumb' : 'heart', width / 2, height / 2 - 50);
    setShowInteractionMenu(false);
  };

  // Determine Background Color based on Mood
  let bgClass = 'bg-bebek-bg'; // Default happy
  if (moodScore > 70) bgClass = 'bg-[#E0F2FE]';
  else if (moodScore < 30) bgClass = 'bg-[#C7D2FE]';
  else bgClass = 'bg-[#ECFEFF]';

  return (
    <View className={`flex-1 ${bgClass} transition-colors duration-1000`}>
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4 z-10">
           <View className="flex-row gap-2">
              <JuicyButton className="rounded-2xl shadow-sm" onPress={() => console.log('Open Mood')}>
                 <GlassPanel className="p-2 px-4 rounded-2xl flex-col items-center justify-center">
                    <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-ui">Mood</Text>
                    <Text className="text-2xl font-bold text-gray-800">
                      {moodScore > 70 ? '😄' : moodScore < 30 ? '😔' : '😶'}
                    </Text>
                 </GlassPanel>
              </JuicyButton>
              {/* Daily Affirmation / Streak Placeholder (using Gift/Flame logic if available) */}
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
              <JuicyButton onPress={() => console.log('Notifs')}>
                <GlassPanel className="w-12 h-12 rounded-2xl items-center justify-center">
                  <Bell color="#4B5563" size={20} />
                  {notifications.some(n => !n.read) && (
                    <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
                  )}
                </GlassPanel>
              </JuicyButton>

              <JuicyButton onPress={watchAd}>
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

        {/* Center Area - Pet */}
        <View className="flex-1 justify-center items-center z-0 -mt-10">
            {/* Speech Bubble (Placeholder for now) */}
            <View className="absolute -top-24 bg-white border-4 border-bebek-dark px-6 py-4 rounded-3xl max-w-[85%] z-30 shadow-lg">
                <Text className="text-xl text-bebek-dark text-center font-bold font-hand">Kwek! Apa kabar hatimu hari ini?</Text>
                <View className="absolute -bottom-4 left-1/2 -ml-[12px] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-bebek-dark" />
                <View className="absolute -bottom-[10px] left-1/2 -ml-[8px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white" />
            </View>

            {/* Pet Container */}
            <View className="relative items-center justify-center">
               {/* Interaction Menu */}
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

               <JuicyButton onPress={handlePetPress} className="active:scale-95">
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

            {/* Tools Grid */}
            <View className="flex-row flex-wrap justify-center gap-4 mt-8 w-full px-4">
               {/* Gratitude */}
               <JuicyButton className="w-[22%] aspect-square bg-orange-100 border-b-4 border-orange-200 rounded-3xl items-center justify-center" onPress={() => console.log('Gratitude')}>
                  <Text className="text-3xl mb-1">🍯</Text>
                  <Text className="text-[10px] font-bold text-orange-800 uppercase font-ui">Syukur</Text>
               </JuicyButton>
               {/* Breathe */}
               <JuicyButton className="w-[22%] aspect-square bg-teal-100 border-b-4 border-teal-200 rounded-3xl items-center justify-center" onPress={() => console.log('Breathe')}>
                  <Text className="text-3xl mb-1">🌬️</Text>
                  <Text className="text-[10px] font-bold text-teal-800 uppercase font-ui">Napas</Text>
               </JuicyButton>
               {/* Shop */}
               <JuicyButton className="w-[22%] aspect-square bg-pink-100 border-b-4 border-pink-200 rounded-3xl items-center justify-center" onPress={() => console.log('Shop')}>
                  <Text className="text-3xl mb-1">🛋️</Text>
                  <Text className="text-[10px] font-bold text-pink-800 uppercase font-ui">Pojok</Text>
               </JuicyButton>
               {/* Magic */}
               <JuicyButton className="w-[22%] aspect-square bg-purple-100 border-b-4 border-purple-200 rounded-3xl items-center justify-center" onPress={() => console.log('Magic')}>
                  <Sparkles size={28} color="#6B21A8" className="mb-1" />
                  <Text className="text-[10px] font-bold text-purple-800 uppercase font-ui">Saran</Text>
               </JuicyButton>
            </View>
        </View>

        {/* Footer */}
        <View className="px-6 pb-6 pt-2">
            <JuicyButton className="bg-white border-b-8 border-r-4 border-gray-200 h-20 rounded-3xl flex-row items-center justify-center gap-4 w-full">
                <View className="bg-sky-100 p-2 rounded-2xl">
                   <HeartHandshake size={32} color="#0284c7" />
                </View>
                <View>
                   <Text className="text-2xl text-gray-800 font-bold font-cute">Curhat</Text>
                   <View className="bg-sky-50 px-2 py-0.5 rounded-md mt-1 self-start">
                     <Text className="text-xs text-sky-500 font-bold font-ui">AI Teman ✨</Text>
                   </View>
                </View>
            </JuicyButton>
        </View>

        <ParticleSystem particles={particles} onComplete={handleParticleComplete} />
      </SafeAreaView>
    </View>
  );
}
