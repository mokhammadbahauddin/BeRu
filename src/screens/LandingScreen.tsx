import React from 'react';
import { View, Text, ScrollView, Pressable, Platform, ViewStyle } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Infinity, ArrowRight, PlayCircle, LayoutDashboard, Linkedin, Twitter, Newspaper } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

type RootStackParamList = {
  Landing: undefined;
  Dashboard: undefined;
};

export default function LandingScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Web-only style helper
  const webStyle = (style: any) => Platform.OS === 'web' ? style : {};

  return (
    <ScrollView className="bg-zinc-50 min-h-screen">
      {/* Navbar */}
      <View className="sticky top-0 z-50 bg-white/80 border-b border-zinc-200 px-6 h-16 flex-row items-center justify-between" style={webStyle({ backdropFilter: 'blur(12px)' })}>
        <View className="flex-row items-center gap-2.5">
          <View className="w-8 h-8 bg-zinc-900 rounded-lg items-center justify-center shadow-sm">
            <Infinity size={20} color="white" />
          </View>
          <Text className="font-bold text-lg tracking-tight text-zinc-900">ViralLoop</Text>
        </View>
        <View className="flex-row items-center gap-6">
          <Text className="text-sm font-medium text-zinc-500 hover:text-zinc-900 hidden md:flex">Features</Text>
          <Text className="text-sm font-medium text-zinc-500 hover:text-zinc-900 hidden md:flex">Pricing</Text>
          <Pressable
            onPress={() => navigation.navigate('Dashboard')}
            className="bg-zinc-900 px-5 py-2 rounded-md shadow-sm active:scale-95 transition-transform"
          >
            <Text className="text-white text-sm font-medium">Get Started</Text>
          </Pressable>
        </View>
      </View>

      {/* Hero Section */}
      <View className="items-center justify-center px-6 pt-24 pb-32">
        <Animated.View entering={FadeInDown.delay(100).duration(500)} className="flex-row items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 mb-8">
          <View className="w-2 h-2 rounded-full bg-green-500" />
          <Text className="text-xs font-medium text-zinc-600">v1.0 is Live</Text>
        </Animated.View>

        <Animated.Text entering={FadeInDown.delay(200).duration(500)} className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6 text-center leading-tight max-w-4xl">
          Stop Summarizing.{'\n'}
          <Text className="text-zinc-500">Start Repurposing.</Text>
        </Animated.Text>

        <Animated.Text entering={FadeInDown.delay(300).duration(500)} className="text-xl text-zinc-500 max-w-2xl mb-10 text-center leading-relaxed">
          Turn one YouTube video into a week's worth of high-engagement LinkedIn posts, Twitter threads, and Blog articles instantly.
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(400).duration(500)} className="flex-col sm:flex-row gap-4">
          <Pressable
            onPress={() => navigation.navigate('Dashboard')}
            className="bg-zinc-900 px-8 py-3.5 rounded-lg flex-row items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
          >
            <Text className="text-white text-base font-semibold">Try ViralLoop Free</Text>
            <ArrowRight size={16} color="white" />
          </Pressable>
          <Pressable className="bg-white border border-zinc-200 px-8 py-3.5 rounded-lg flex-row items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-zinc-50">
            <PlayCircle size={16} color="#3f3f46" />
            <Text className="text-zinc-700 text-base font-semibold">Watch Demo</Text>
          </Pressable>
        </Animated.View>

        {/* Hero Image Mockup */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)} className="mt-20 w-full max-w-5xl bg-zinc-900 p-2 rounded-xl shadow-2xl border border-zinc-800">
          <View className="bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 aspect-[16/9] relative items-center justify-center">
            <View className="absolute inset-0 flex-row">
              <View className="w-64 border-r border-zinc-800 bg-zinc-900/50 p-4 hidden md:flex">
                <View className="h-8 w-32 bg-zinc-800 rounded mb-6" />
                <View className="gap-3">
                  <View className="h-12 w-full bg-zinc-800/50 rounded border border-zinc-700" />
                  <View className="h-12 w-full bg-zinc-800/30 rounded border border-zinc-800" />
                </View>
              </View>
              <View className="flex-1 p-8 items-center justify-center">
                <LayoutDashboard size={64} color="#52525b" style={{ opacity: 0.5, marginBottom: 16 }} />
                <Text className="text-zinc-500">Interactive Dashboard Preview</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Features Grid */}
      <View id="features" className="bg-white py-24 border-y border-zinc-200">
        <View className="max-w-7xl mx-auto px-6">
          <View className="items-center mb-16">
            <Text className="text-3xl font-bold tracking-tight text-zinc-900 mb-4 text-center">The Content Engine</Text>
            <Text className="text-zinc-500 max-w-2xl text-center">We don't just shorten content. We restructure it for specific platforms using advanced prompt engineering.</Text>
          </View>

          <View className="flex-col md:flex-row gap-8 flex-wrap">
             {/* Feature 1 */}
            <View className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50 flex-1 min-w-[300px]">
              <View className="w-12 h-12 bg-blue-100 rounded-lg items-center justify-center mb-6">
                <Linkedin size={24} color="#2563eb" />
              </View>
              <Text className="text-xl font-semibold mb-3 text-zinc-900">LinkedIn Ghostwriter</Text>
              <Text className="text-zinc-500 leading-relaxed">Generates posts with viral hooks, meat-and-potatoes value, and engagement-driving questions.</Text>
            </View>
            {/* Feature 2 */}
            <View className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50 flex-1 min-w-[300px]">
              <View className="w-12 h-12 bg-sky-100 rounded-lg items-center justify-center mb-6">
                <Twitter size={24} color="#0ea5e9" />
              </View>
              <Text className="text-xl font-semibold mb-3 text-zinc-900">Thread Weaver</Text>
              <Text className="text-zinc-500 leading-relaxed">Automatically splits long videos into 6-10 tweet threads that maintain context and flow.</Text>
            </View>
            {/* Feature 3 */}
            <View className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50 flex-1 min-w-[300px]">
              <View className="w-12 h-12 bg-amber-100 rounded-lg items-center justify-center mb-6">
                <Newspaper size={24} color="#d97706" />
              </View>
              <Text className="text-xl font-semibold mb-3 text-zinc-900">SEO Blog Builder</Text>
              <Text className="text-zinc-500 leading-relaxed">Creates H1/H2 structured articles optimized for search engines, ready to copy-paste into CMS.</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
