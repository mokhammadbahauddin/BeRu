import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Platform, Image, ViewStyle, TextStyle } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Infinity, Zap, Youtube, Sparkles, Clock, PlayCircle, FileText, Linkedin, Twitter, Newspaper, Lock, RefreshCcw, Copy, Check, ThumbsUp, ThumbsDown, Bot } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

// Define navigation types
type RootStackParamList = {
  Landing: undefined;
  Dashboard: undefined;
};

// Mock Data
type ContentMode = 'summary' | 'linkedin' | 'twitter' | 'blog';
const MOCK_CONTENT: Record<ContentMode, string> = {
  summary: `## The Psychology of Unwavering Commitment

Rick Astley's "Never Gonna Give You Up" isn't just an 80s pop hit; it's a masterclass in declaring absolute loyalty. The core message transcends the catchy synth-pop beat, delivering a promise of emotional security that is increasingly rare in modern contexts.

### Key Insights
*   **Consistency builds trust:** The repetition of "never gonna" reinforces a binding contract.
*   **Emotional Transparency:** "Inside we both know what's been going on" — acknowledging reality is key.`,
  linkedin: `**Hook:** Most people think "Never Gonna Give You Up" is just a meme. They're wrong. It's the ultimate lesson in customer retention.

I analyzed the lyrics of Rick Astley's 1987 hit, and realized it outlines the perfect SLA (Service Level Agreement) for any business:

*   "Never gonna give you up" = Retention
*   "Never gonna let you down" = Reliability
*   "Never gonna run around and desert you" = Loyalty

In a world of churn and burn, be the Rick Astley of your industry.

Are you letting your customers down? 👇

#BusinessStrategy #CustomerSuccess #RickRoll`,
  twitter: `1/ Why Rick Astley is a better business coach than your MBA professor. 🧵

2/ "We're no strangers to love / You know the rules and so do I"
Lesson: Set clear expectations immediately. Onboarding is everything.

3/ "A full commitment's what I'm thinking of"
Lesson: Don't half-bake your product. Go all in or go home.

4/ "Never gonna tell a lie and hurt you"
Lesson: Radical transparency. If you screw up, own it.`,
  blog: `# Rickrolling Your Way to Success: Analyzing the Astley Method

## Introduction
In 1987, a cultural phenomenon was born. But beyond the memes, there lies a deep philosophy of commitment.

## The Three Pillars of Astley
The song outlines three distinct promises that every leader should make to their team...`
};

export default function DashboardScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [url, setUrl] = useState('https://youtu.be/dQw4w9WgXcQ');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [mode, setMode] = useState<ContentMode>('summary');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 1500);
  };

  const handleCopy = () => {
    setCopied(true);
    // Copy logic would go here
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    const content = MOCK_CONTENT[mode] || '';
    // Simple markdown-like rendering for MVP
    return (
        <View className="gap-4">
            {content.split('\n\n').map((block: string, i: number) => (
                <Text key={i} className="text-zinc-600 text-sm leading-6">
                    {block.replace(/#/g, '')}
                </Text>
            ))}
        </View>
    );
  };

  // Web-only style helper
  const webStyle = (style: any) => Platform.OS === 'web' ? style : {};

  return (
    <View className="flex-1 bg-zinc-50 flex-col h-screen">
      {/* Dashboard Navbar */}
      <View className="sticky top-0 z-50 bg-white/80 border-b border-zinc-200 px-6 h-16 flex-row items-center justify-between" style={webStyle({ backdropFilter: 'blur(12px)' })}>
        <Pressable onPress={() => navigation.navigate('Landing')} className="flex-row items-center gap-2.5">
          <View className="w-8 h-8 bg-zinc-900 rounded-lg items-center justify-center shadow-sm">
            <Infinity size={20} color="white" />
          </View>
          <Text className="font-bold text-lg tracking-tight text-zinc-900">ViralLoop</Text>
        </Pressable>

        <View className="flex-row items-center gap-4">
          <View className="hidden md:flex flex-row items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-md border border-zinc-200 shadow-sm">
            <Zap size={14} color="#f59e0b" fill="#f59e0b" />
            <Text className="text-xs font-medium text-zinc-600">2 Credits Left</Text>
          </View>
          <View className="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300 items-center justify-center">
            <Text className="font-medium text-xs text-zinc-500">JD</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Left Column: Input & Context */}
          <View className="lg:w-1/3 w-full gap-6">
            <View className="gap-4">
              <View>
                <Text className="text-2xl font-bold tracking-tight text-zinc-900">New Project</Text>
                <Text className="text-zinc-500 text-sm mt-1">Paste a YouTube URL to ghostwrite content.</Text>
              </View>

              <View className="bg-white p-1.5 rounded-xl border border-zinc-200 shadow-sm">
                <View className="relative justify-center">
                  <View className="absolute left-3 z-10">
                    <Youtube size={16} color="#a1a1aa" />
                  </View>
                  <TextInput
                    value={url}
                    onChangeText={setUrl}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-transparent rounded-lg text-sm focus:bg-white text-zinc-900 font-medium"
                    style={webStyle({ outline: 'none' })} // Web specific
                  />
                </View>
                <Pressable onPress={handleGenerate} className="w-full mt-2 bg-zinc-900 active:bg-zinc-800 py-2.5 rounded-lg flex-row items-center justify-center gap-2 shadow-sm">
                  {isGenerating ? (
                    <Text className="text-white font-medium text-sm">Generating...</Text>
                  ) : (
                    <>
                      <Sparkles size={16} color="white" />
                      <Text className="text-white font-medium text-sm">Generate Content</Text>
                    </>
                  )}
                </Pressable>
              </View>
            </View>

            {/* Video Context Card */}
            {generated && (
              <Animated.View entering={FadeIn.duration(500)} className="bg-white border border-zinc-200 p-4 rounded-xl gap-3 shadow-sm">
                <View className="flex-row items-center justify-between">
                  <Text className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Source Video</Text>
                  <View className="bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                    <Text className="text-xs text-green-600 font-medium">Processed</Text>
                  </View>
                </View>
                <View className="flex-row gap-3">
                  <View className="w-24 h-16 bg-zinc-900 rounded-md overflow-hidden relative items-center justify-center">
                    <Image source={{ uri: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" }} className="w-full h-full opacity-80" resizeMode="cover" />
                    <View className="absolute inset-0 items-center justify-center">
                        <PlayCircle size={24} color="white" style={{ opacity: 0.8 }} />
                    </View>
                  </View>
                  <View className="flex-1 justify-center">
                    <Text className="font-semibold text-sm leading-tight text-zinc-900" numberOfLines={2}>Rick Astley - Never Gonna Give You Up (Official Music Video)</Text>
                    <View className="flex-row items-center gap-2 mt-1.5">
                      <View className="flex-row items-center gap-1">
                        <Clock size={12} color="#71717a" />
                        <Text className="text-xs text-zinc-500">3:32</Text>
                      </View>
                      <Text className="text-zinc-300 text-[10px]">•</Text>
                      <Text className="text-xs text-zinc-500">1.2B Views</Text>
                    </View>
                  </View>
                </View>
              </Animated.View>
            )}

             {/* Recent History */}
             <View className="pt-4 border-t border-zinc-200 gap-3">
                <View className="flex-row items-center justify-between px-1">
                    <Text className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Recent Projects</Text>
                </View>
                <View className="gap-1">
                    <Pressable className="w-full p-2.5 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-zinc-200 flex-row items-start gap-3">
                        <View className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <View className="flex-1">
                            <Text className="text-sm font-medium text-zinc-600" numberOfLines={1}>Alex Hormozi - $100M Leads Strategy</Text>
                            <Text className="text-xs text-zinc-400 mt-0.5">Generated LinkedIn • 2h ago</Text>
                        </View>
                    </Pressable>
                    <Pressable className="w-full p-2.5 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-zinc-200 flex-row items-start gap-3">
                        <View className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-300" />
                        <View className="flex-1">
                            <Text className="text-sm font-medium text-zinc-600" numberOfLines={1}>MKBHD - iPhone 15 Review</Text>
                            <Text className="text-xs text-zinc-400 mt-0.5">Generated Blog • 1d ago</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
          </View>

          {/* Right Column: Editor */}
          <View className="lg:w-2/3 w-full h-[600px] bg-white rounded-xl border border-zinc-200 shadow-sm flex-col overflow-hidden relative">

            {/* Loading Overlay */}
            {isGenerating && (
                <View className="absolute inset-0 bg-white/90 z-20 items-center justify-center">
                    <View className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full mb-4" style={{ transform: [{rotate: '45deg'}] }} />
                    <Text className="text-zinc-900 font-semibold">Ghostwriting Content...</Text>
                    <Text className="text-zinc-500 text-sm mt-1">Analyzing transcript & tonality</Text>
                </View>
            )}

            {/* Editor Toolbar */}
            <View className="flex-row items-center justify-between border-b border-zinc-200 bg-zinc-50/50 p-2 overflow-scroll">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-1">
                    {[
                        { id: 'summary', icon: FileText, label: 'Summary', color: '#2563eb' },
                        { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', locked: true },
                        { id: 'twitter', icon: Twitter, label: 'Twitter', locked: true },
                        { id: 'blog', icon: Newspaper, label: 'Blog Post', locked: true }
                    ].map((tab) => (
                        <Pressable
                            key={tab.id}
                            onPress={() => setMode(tab.id as ContentMode)}
                            className={`px-3 py-1.5 rounded-md flex-row items-center gap-2 border ${mode === tab.id ? 'bg-white border-zinc-200 shadow-sm' : 'border-transparent'}`}
                        >
                            <tab.icon size={14} color={mode === tab.id ? tab.color || '#18181b' : '#71717a'} />
                            <Text className={`text-xs font-medium ${mode === tab.id ? 'text-zinc-900' : 'text-zinc-500'}`}>{tab.label}</Text>
                            {tab.locked && <Lock size={12} color="#a1a1aa" />}
                        </Pressable>
                    ))}
                </ScrollView>
                <View className="pr-2">
                    <Text className="text-[10px] text-zinc-400 font-mono">v1.0.2</Text>
                </View>
            </View>

            {/* Content Area */}
            <ScrollView className="flex-1 p-8 bg-white">
                {!generated ? (
                    <View className="flex-1 items-center justify-center py-20 opacity-60">
                        <View className="w-16 h-16 bg-zinc-100 rounded-full items-center justify-center mb-4">
                            <Sparkles size={32} color="#d4d4d8" />
                        </View>
                        <Text className="text-lg font-medium text-zinc-900">Ready to Repurpose</Text>
                        <Text className="text-zinc-500 max-w-xs mt-1 text-center">Enter a YouTube URL and hit generate to see the magic happen.</Text>
                    </View>
                ) : (
                    <Animated.View entering={FadeInDown.duration(300)} className="max-w-2xl mx-auto pb-12">
                        {/* Header */}
                        <View className="flex-row items-center justify-between mb-8 pb-4 border-b border-zinc-100">
                             <View className="flex-row items-center gap-3">
                                <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center border border-blue-100">
                                    <Bot size={16} color="#2563eb" />
                                </View>
                                <View>
                                    <Text className="text-xs font-semibold text-zinc-900">ViralLoop AI</Text>
                                    <Text className="text-[10px] text-zinc-400">Generated via Gemini 1.5 Flash</Text>
                                </View>
                             </View>
                             <View className="flex-row gap-1">
                                <Pressable className="p-1.5 rounded hover:bg-zinc-100"><ThumbsUp size={16} color="#a1a1aa" /></Pressable>
                                <Pressable className="p-1.5 rounded hover:bg-zinc-100"><ThumbsDown size={16} color="#a1a1aa" /></Pressable>
                             </View>
                        </View>

                        {/* Text */}
                        {renderContent()}
                    </Animated.View>
                )}
            </ScrollView>

             {/* Footer Actions */}
             <View className="p-4 bg-white border-t border-zinc-200 flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                    <Pressable className="p-2 hover:bg-zinc-100 rounded-lg">
                        <RefreshCcw size={16} color="#71717a" />
                    </Pressable>
                    <View className="h-4 w-px bg-zinc-200 mx-1" />
                    <Text className="text-xs text-zinc-400 font-medium ml-1">Words: {MOCK_CONTENT[mode]?.split(' ').length || 0}</Text>
                </View>
                <View className="flex-row gap-3">
                    <Pressable className="px-4 py-2 bg-white border border-zinc-200 rounded-lg shadow-sm">
                        <Text className="text-zinc-700 text-xs font-medium">Save Draft</Text>
                    </Pressable>
                    <Pressable onPress={handleCopy} className={`px-4 py-2 rounded-lg flex-row items-center gap-2 shadow-sm ${copied ? 'bg-green-100' : 'bg-zinc-900'}`}>
                        {copied ? <Check size={14} color="#15803d" /> : <Copy size={14} color="white" />}
                        <Text className={`text-xs font-medium ${copied ? 'text-green-700' : 'text-white'}`}>
                            {copied ? 'Copied!' : 'Copy Text'}
                        </Text>
                    </Pressable>
                </View>
             </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
