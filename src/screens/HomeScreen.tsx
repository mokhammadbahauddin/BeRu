import React, { useState } from 'react';
import { View, SafeAreaView, Dimensions } from 'react-native';
import { useGame } from '../context/GameContext';
import { ParticleSystem } from '../components/ParticleSystem';

// Components
import { HomeHeader } from '../components/home/HomeHeader';
import { PetDisplay } from '../components/home/PetDisplay';
import { ToolsGrid } from '../components/home/ToolsGrid';
import { JuicyButton } from '../components/JuicyButton';
import { HeartHandshake } from 'lucide-react-native';
import { Text } from 'react-native';

// Modals
import { MoodModal } from '../components/modals/MoodModal';
import { GratitudeModal } from '../components/modals/GratitudeModal';
import { BreathingModal } from '../components/modals/BreathingModal';
import { ShopModal } from '../components/modals/ShopModal';
import { ChatModal } from '../components/modals/ChatModal';
import { SettingsModal } from '../components/modals/SettingsModal';
import { OnboardingModal } from '../components/modals/OnboardingModal';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { moodScore, interact, watchAd, magicActivity, firstTimeUser } = useGame();

  const [particles, setParticles] = useState<{ id: number; x: number; y: number; type: string }[]>([]);

  // Modal Visibility State
  const [showMood, setShowMood] = useState(false);
  const [showGratitude, setShowGratitude] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

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

  const handlePetPress = (event: any) => {
     // Handled by PetDisplay internal logic for interaction menu, but we can spawn tap particles here
     const { pageX, pageY } = event.nativeEvent;
     // Optional: tap particles
  };

  const handleInteract = (type: 'pet' | 'feed' | 'hug') => {
    interact(type);
    spawnParticles(10, type === 'feed' ? 'crumb' : 'heart', width / 2, height / 2 - 50);
  };

  const handleMagic = () => {
      magicActivity();
      spawnParticles(15, 'sparkle', width / 2, height / 2);
  };

  // Determine Background Color based on Mood
  let bgClass = 'bg-bebek-bg';
  if (moodScore > 70) bgClass = 'bg-[#E0F2FE]';
  else if (moodScore < 30) bgClass = 'bg-[#C7D2FE]';
  else bgClass = 'bg-[#ECFEFF]';

  return (
    <View className={`flex-1 ${bgClass} transition-colors duration-1000`}>
      <SafeAreaView className="flex-1 justify-between">

        <HomeHeader
            onOpenMood={() => setShowMood(true)}
            onOpenSettings={() => setShowSettings(true)}
            onWatchAd={watchAd}
        />

        <PetDisplay
            onInteract={handleInteract}
            onPetPress={handlePetPress}
        />

        <View>
            <ToolsGrid
                onOpenGratitude={() => setShowGratitude(true)}
                onOpenBreathing={() => setShowBreathing(true)}
                onOpenShop={() => setShowShop(true)}
                onMagic={handleMagic}
            />

            <View className="px-6 pb-6 pt-2">
                <JuicyButton
                    onPress={() => setShowChat(true)}
                    className="bg-white border-b-8 border-r-4 border-gray-200 h-20 rounded-3xl flex-row items-center justify-center gap-4 w-full"
                >
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
        </View>

        <ParticleSystem particles={particles} onComplete={handleParticleComplete} />

        {/* Modals */}
        <MoodModal visible={showMood} onClose={() => setShowMood(false)} />
        <GratitudeModal visible={showGratitude} onClose={() => setShowGratitude(false)} />
        <BreathingModal visible={showBreathing} onClose={() => setShowBreathing(false)} />
        <ShopModal visible={showShop} onClose={() => setShowShop(false)} />
        <ChatModal visible={showChat} onClose={() => setShowChat(false)} />
        <SettingsModal visible={showSettings} onClose={() => setShowSettings(false)} />

        {/* Onboarding Overlay */}
        <OnboardingModal visible={firstTimeUser} />

      </SafeAreaView>
    </View>
  );
}
