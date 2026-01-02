import React from 'react';
import { View, Text, ScrollView, Pressable, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Infinity as InfinityIcon, ArrowRight, PlayCircle, ChevronRight, Lock,
  Zap, BrainCircuit, PenTool, BarChart2
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function LandingScreen() {
  const navigation = useNavigation<any>();
  const webStyle = (style: any) => Platform.OS === 'web' ? style : {};

  return (
    <ScrollView className="bg-white min-h-screen">

      {/* Navbar */}
      <View className="sticky top-0 z-50 bg-white/80 border-b border-zinc-100 px-6 h-14 flex-row items-center justify-between" style={webStyle({ backdropFilter: 'blur(12px)' })}>
        <Pressable onPress={() => window.scrollTo(0,0)} className="flex-row items-center gap-2 group cursor-pointer">
           <View className="w-7 h-7 bg-zinc-900 rounded-lg items-center justify-center shadow-lg">
             <InfinityIcon size={16} color="white" />
           </View>
           <Text className="font-bold text-base tracking-tight text-zinc-900">ViralLoop</Text>
        </Pressable>

        <View className="hidden md:flex flex-row items-center gap-8">
            {['Features', 'Customers', 'Pricing', 'Resources'].map((item) => (
                <Text key={item} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">{item}</Text>
            ))}
        </View>

        <View className="flex-row items-center gap-3">
             <Text className="hidden md:flex text-sm font-medium text-zinc-500 hover:text-zinc-900 px-3 py-2">Sign in</Text>
             <Pressable
                onPress={() => navigation.navigate('Dashboard')}
                className="bg-zinc-900 px-4 py-1.5 rounded-lg shadow-sm hover:bg-zinc-800 transition-all active:translate-y-0.5"
             >
                <Text className="text-white text-sm font-medium">Get Started</Text>
             </Pressable>
        </View>
      </View>

      {/* Hero Section */}
      <View className="relative pt-20 pb-32 overflow-hidden border-b border-zinc-100 items-center">
          {/* Background Grid Pattern - Simulated with repeated views or image if available, keeping simple for now */}
          <View className="absolute inset-0 bg-white opacity-30 pointer-events-none" />

          {/* Badge */}
          <Animated.View entering={FadeInDown.delay(100)} className="flex-row items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm mb-8">
              <View className="relative w-2 h-2">
                 <View className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
                 <View className="w-2 h-2 bg-emerald-500 rounded-full" />
              </View>
              <Text className="text-xs font-medium text-zinc-600 uppercase tracking-wide">Gen-2 Engine Live</Text>
              <View className="w-px h-3 bg-zinc-200 mx-1" />
              <View className="flex-row items-center gap-1">
                  <Text className="text-xs text-zinc-400">Read Update</Text>
                  <ArrowRight size={12} color="#a1a1aa" />
              </View>
          </Animated.View>

          {/* Heading */}
          <Animated.Text entering={FadeInDown.delay(200)} className="text-5xl md:text-7xl font-semibold tracking-tighter text-zinc-900 mb-6 text-center leading-tight max-w-4xl px-4">
              Turn video content into{'\n'}
              <Text className="text-zinc-400">revenue-generating assets.</Text>
          </Animated.Text>

          {/* Subheading */}
          <Animated.Text entering={FadeInDown.delay(300)} className="text-lg md:text-xl text-zinc-500 max-w-2xl text-center mb-10 leading-relaxed px-6">
              Stop manually rewriting content. Our AI engine analyzes your video, extracts viral hooks, and generates optimized posts for LinkedIn, X, and SEO blogs.
          </Animated.Text>

          {/* CTAs */}
          <Animated.View entering={FadeInDown.delay(400)} className="flex-col sm:flex-row gap-3 w-full sm:w-auto px-6">
              <Pressable
                onPress={() => navigation.navigate('Dashboard')}
                className="bg-zinc-900 h-12 px-8 rounded-lg flex-row items-center justify-center gap-2 shadow-xl"
              >
                  <Text className="text-white font-medium">Start Building Free</Text>
                  <ChevronRight size={16} color="white" />
              </Pressable>
              <Pressable className="bg-white border border-zinc-200 h-12 px-8 rounded-lg flex-row items-center justify-center gap-2 shadow-sm hover:bg-zinc-50">
                  <PlayCircle size={16} color="#a1a1aa" />
                  <Text className="text-zinc-700 font-medium">See how it works</Text>
              </Pressable>
          </Animated.View>

          {/* Interface Mockup */}
          <Animated.View entering={FadeInDown.delay(500)} className="mt-16 w-full max-w-5xl px-4">
              <View className="rounded-xl bg-zinc-900 p-2 shadow-2xl border border-zinc-800 relative overflow-hidden">
                   {/* Top Bar */}
                   <View className="h-10 bg-zinc-950 border-b border-zinc-800 flex-row items-center px-4 gap-2 rounded-t-lg">
                       <View className="flex-row gap-1.5">
                           <View className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                           <View className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                           <View className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                       </View>
                       <View className="ml-4 flex-1 items-center justify-center">
                           <View className="bg-zinc-900 border border-zinc-800 rounded px-3 py-1 flex-row items-center gap-2">
                               <Lock size={8} color="#71717a" />
                               <Text className="text-[10px] text-zinc-500 font-mono">viralloop.ai/engine/v2</Text>
                           </View>
                       </View>
                   </View>
                   {/* Content */}
                   <View className="bg-zinc-950 rounded-b-lg overflow-hidden aspect-[16/9] relative flex-row">
                       {/* Sidebar Mock */}
                       <View className="w-1/4 border-r border-zinc-800 p-4 hidden md:flex gap-3">
                           <View className="flex-row items-center gap-2 mb-4">
                               <View className="w-6 h-6 rounded bg-zinc-800" />
                               <View className="h-3 w-16 bg-zinc-800 rounded" />
                           </View>
                           <View className="h-8 w-full bg-zinc-900 border border-zinc-800 rounded mb-1" />
                           <View className="h-8 w-full bg-transparent rounded mb-1 opacity-50" />
                           <View className="h-8 w-full bg-transparent rounded mb-1 opacity-50" />
                       </View>
                       {/* Main Editor Mock */}
                       <View className="flex-1 p-6 flex-col">
                            <View className="absolute top-6 right-6 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded flex-row items-center gap-1.5">
                                <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <Text className="text-[10px] font-medium text-emerald-500">Optimized</Text>
                            </View>
                            <View className="h-6 w-3/4 bg-zinc-800 rounded mb-4" />
                            <View className="gap-2 mb-6">
                                <View className="h-3 w-full bg-zinc-800/50 rounded" />
                                <View className="h-3 w-full bg-zinc-800/50 rounded" />
                                <View className="h-3 w-5/6 bg-zinc-800/50 rounded" />
                            </View>
                            <View className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                                <View className="flex-row items-center gap-3 mb-3">
                                    <View className="w-8 h-8 rounded-full bg-zinc-800" />
                                    <View className="gap-1">
                                        <View className="h-2 w-24 bg-zinc-800 rounded" />
                                        <View className="h-2 w-16 bg-zinc-800/50 rounded" />
                                    </View>
                                </View>
                                <View className="gap-2">
                                    <View className="h-2 w-full bg-zinc-800 rounded" />
                                    <View className="h-2 w-2/3 bg-zinc-800 rounded" />
                                </View>
                            </View>
                       </View>
                   </View>
              </View>
          </Animated.View>
      </View>

      {/* Trusted By */}
      <View className="border-b border-zinc-100 py-10 bg-zinc-50/50 items-center">
          <View className="max-w-7xl px-6 w-full">
               <Text className="text-center text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-8">Trusted by marketing teams at</Text>
               <View className="flex-row flex-wrap justify-center gap-12 opacity-40 grayscale">
                   {/* Placeholders for logos since we don't have SVGs handy in RN easily without more deps */}
                   <View className="h-8 w-24 bg-zinc-300 rounded" />
                   <View className="h-8 w-24 bg-zinc-300 rounded" />
                   <View className="h-8 w-24 bg-zinc-300 rounded" />
                   <View className="h-8 w-24 bg-zinc-300 rounded" />
               </View>
          </View>
      </View>

      {/* Bento Grid */}
      <View className="py-24 bg-white">
          <View className="max-w-7xl mx-auto px-6">
              <View className="mb-16">
                  <Text className="text-3xl font-semibold tracking-tight text-zinc-900 mb-4">Capabilities built for scale.</Text>
                  <Text className="text-zinc-500 max-w-xl text-lg">We don't just summarize. We extract context, tone, and intent to create content that sounds like you.</Text>
              </View>

              <View className="flex-col md:flex-row flex-wrap gap-6">
                  {/* Feature 1 (Large) */}
                  <View className="w-full md:w-[65%] rounded-2xl border border-zinc-200 bg-zinc-50 p-8 relative overflow-hidden">
                      <View className="relative z-10">
                          <View className="w-10 h-10 rounded-lg bg-white border border-zinc-200 items-center justify-center mb-6 shadow-sm">
                              <Zap size={20} color="#2563eb" />
                          </View>
                          <Text className="text-xl font-semibold text-zinc-900 mb-2">Instant Repurposing</Text>
                          <Text className="text-zinc-500 max-w-sm">Paste a YouTube URL and get a week's worth of content in 30 seconds.</Text>
                      </View>
                  </View>

                  {/* Feature 2 */}
                  <View className="flex-1 min-w-[300px] rounded-2xl border border-zinc-200 bg-white p-8">
                       <View className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 items-center justify-center mb-6">
                           <BrainCircuit size={20} color="#9333ea" />
                       </View>
                       <Text className="text-xl font-semibold text-zinc-900 mb-2">Contextual AI</Text>
                       <Text className="text-zinc-500 text-sm leading-relaxed">Our model understands nuance better than generic LLMs.</Text>
                  </View>

                   {/* Feature 3 */}
                   <View className="flex-1 min-w-[300px] rounded-2xl border border-zinc-200 bg-white p-8">
                       <View className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 items-center justify-center mb-6">
                           <PenTool size={20} color="#ea580c" />
                       </View>
                       <Text className="text-xl font-semibold text-zinc-900 mb-2">Tone Matching</Text>
                       <Text className="text-zinc-500 text-sm leading-relaxed">Train the engine on your previous writing to maintain voice.</Text>
                  </View>

                   {/* Feature 4 (Large Dark) */}
                   <View className="w-full md:w-[65%] rounded-2xl border border-zinc-200 bg-zinc-900 p-8 relative overflow-hidden">
                      <View className="relative z-10">
                          <View className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 items-center justify-center mb-6 shadow-sm">
                              <BarChart2 size={20} color="#34d399" />
                          </View>
                          <Text className="text-xl font-semibold text-white mb-2">Performance Prediction</Text>
                          <Text className="text-zinc-400 max-w-sm">We score generated content against millions of viral posts.</Text>
                      </View>
                   </View>
              </View>
          </View>
      </View>

      {/* Footer */}
      <View className="bg-zinc-50 border-t border-zinc-200 pt-16 pb-12">
          <View className="max-w-7xl mx-auto px-6">
              <View className="flex-col md:flex-row gap-8 mb-12">
                  <View className="flex-1">
                      <View className="flex-row items-center gap-2 mb-4">
                          <View className="w-6 h-6 bg-zinc-900 rounded items-center justify-center">
                              <InfinityIcon size={12} color="white" />
                          </View>
                          <Text className="font-bold text-zinc-900">ViralLoop</Text>
                      </View>
                      <Text className="text-xs text-zinc-500 leading-relaxed">Engineered in San Francisco.</Text>
                  </View>
                  <View className="flex-row gap-12">
                      <View>
                          <Text className="font-semibold text-zinc-900 text-sm mb-4">Product</Text>
                          <View className="gap-2">
                              <Text className="text-sm text-zinc-500">Features</Text>
                              <Text className="text-sm text-zinc-500">Integrations</Text>
                          </View>
                      </View>
                      <View>
                          <Text className="font-semibold text-zinc-900 text-sm mb-4">Company</Text>
                          <View className="gap-2">
                              <Text className="text-sm text-zinc-500">About</Text>
                              <Text className="text-sm text-zinc-500">Contact</Text>
                          </View>
                      </View>
                  </View>
              </View>
              <View className="border-t border-zinc-200 pt-8">
                  <Text className="text-xs text-zinc-400">© 2024 ViralLoop Inc. All rights reserved.</Text>
              </View>
          </View>
      </View>

    </ScrollView>
  );
}
