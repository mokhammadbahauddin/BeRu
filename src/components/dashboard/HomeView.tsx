import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Image, Platform } from 'react-native';
import {
  Link, X, Play, HelpCircle, Linkedin, Twitter, FileText, List, Sparkles,
  Bold, Italic, Link2, Check, Copy, Download, Layout, Loader2
} from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';

// Mock Content
const CONTENT_MOCK = {
    summary: `## The Psychology of Commitment: An Analysis

Rick Astley's "Never Gonna Give You Up" isn't just a meme; it's a masterclass in establishing trust. In a business context, the lyrics map perfectly to Service Level Agreements (SLAs).

### Key Takeaways
*   **Reliability:** "Never gonna let you down" speaks to uptime and consistency.
*   **Transparency:** "Inside we both know what's been going on" creates authentic connection.
*   **Long-term Vision:** "We've known each other for so long" emphasizes LTV (Lifetime Value).

> "A full commitment's what I'm thinking of / You wouldn't get this from any other guy" — This is your Unique Selling Proposition (USP).`,
    linkedin: `Stop overcomplicating customer success. 🛑

I just revisited a classic piece of media from 1987, and it teaches us more about retention than any SaaS playbook.

Rick Astley’s specific promises constitute the perfect SLA:
1️⃣ "Never gonna give you up" (Churn prevention)
2️⃣ "Never gonna let you down" (Reliability)
3️⃣ "Never gonna run around" (Focus)

Most companies fail at #2, which makes #1 impossible.

**The lesson?** Don't innovate on trust. Be boringly reliable.

👇 How do you define reliability in your niche?

#CustomerSuccess #SaaS #Growth #BusinessStrategy`,
    twitter: `1/ Why Rick Astley is a better business coach than your MBA professor. 🧵

2/ "We're no strangers to love / You know the rules and so do I"
Lesson: Set clear expectations immediately. Onboarding is everything.

3/ "A full commitment's what I'm thinking of"
In a world of short-term hacks, long-term commitment is the ultimate moat.`
};

export default function HomeView() {
  const [url, setUrl] = useState('https://youtube.com/watch?v=dQw4w9WgXcQ');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [mode, setMode] = useState<'summary' | 'linkedin' | 'twitter'>('summary');
  const [showSave, setShowSave] = useState(false);

  // Marquee Animation for loading
  const marqueeX = useSharedValue(0);
  const marqueeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: marqueeX.value }]
  }));

  const handleGenerate = () => {
    if (!url) return;
    setIsGenerating(true);
    setGenerated(false);

    // Start marquee
    marqueeX.value = withRepeat(withTiming(-100, { duration: 1000, easing: Easing.linear }), -1, false);

    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
      setShowSave(true);
      setTimeout(() => setShowSave(false), 2000);
    }, 2500);
  };

  const renderContent = () => {
     const content = CONTENT_MOCK[mode];
     return content.split('\n\n').map((block, i) => (
        <Text key={i} className="text-zinc-600 text-sm leading-7 mb-4">
            {block}
        </Text>
     ));
  };

  const webStyle = (style: any) => Platform.OS === 'web' ? style : {};

  return (
    <View className="flex-1 flex-col md:flex-row h-full overflow-hidden">

        {/* Left Panel: Configuration */}
        <View className="w-full md:w-[400px] bg-white border-r border-zinc-200 flex-col z-10 shadow-sm">
            <View className="h-14 border-b border-zinc-100 flex-row items-center px-6 justify-between flex-shrink-0">
                <Text className="font-semibold text-sm text-zinc-900">Project Setup</Text>
                <Pressable><Text className="text-xs text-zinc-400 hover:text-zinc-900 underline">Reset</Text></Pressable>
            </View>

            <ScrollView className="flex-1 p-6" contentContainerStyle={{ gap: 24 }}>
                 {/* URL Input */}
                 <View className="gap-3">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-xs font-medium text-zinc-700">Source URL</Text>
                        <View className="bg-zinc-100 px-1.5 rounded"><Text className="text-[10px] text-zinc-400">YouTube / Vimeo</Text></View>
                    </View>
                    <View className="relative">
                        <View className="absolute left-3 top-3 z-10"><Link size={16} color="#a1a1aa" /></View>
                        <TextInput
                            value={url}
                            onChangeText={setUrl}
                            placeholder="Paste video link..."
                            className="w-full pl-10 pr-10 py-2.5 text-sm border border-zinc-200 rounded-lg text-zinc-900 bg-zinc-50 focus:bg-white focus:border-zinc-900 transition-all"
                            style={webStyle({ outline: 'none' })}
                        />
                        <Pressable onPress={() => setUrl('')} className="absolute right-3 top-3"><X size={12} color="#a1a1aa" /></Pressable>
                    </View>
                 </View>

                 {/* Video Preview */}
                 {isGenerating || generated ? (
                     <Animated.View entering={FadeInDown} className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <View className="aspect-video bg-zinc-900 relative items-center justify-center">
                            <Image source={{ uri: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" }} className="w-full h-full opacity-80" resizeMode="cover" />
                            <View className="absolute inset-0 items-center justify-center">
                                <View className="w-10 h-10 bg-white/10 rounded-full items-center justify-center border border-white/20">
                                    <Play size={16} color="white" fill="white" />
                                </View>
                            </View>
                            <View className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded border border-white/10">
                                <Text className="text-white text-[10px] font-medium">3:32</Text>
                            </View>
                        </View>
                        <View className="p-3 bg-white flex-row gap-3">
                            <View className="w-8 h-8 rounded-full bg-zinc-100 overflow-hidden">
                                <Image source={{ uri: "https://ui-avatars.com/api/?name=Rick+Astley&background=random" }} className="w-full h-full" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-medium text-xs text-zinc-900" numberOfLines={1}>Rick Astley - Never Gonna Give You Up</Text>
                                <Text className="text-[10px] text-zinc-500">Official Music Video • 1.2B views</Text>
                            </View>
                        </View>
                     </Animated.View>
                 ) : null}

                 {/* Advanced Settings */}
                 <View className="border-t border-zinc-100 pt-6 gap-5">
                    <View>
                        <View className="flex-row items-center gap-2 mb-2.5">
                            <Text className="text-xs font-medium text-zinc-700">Content Formats</Text>
                            <HelpCircle size={12} color="#d4d4d8" />
                        </View>
                        <View className="flex-row flex-wrap gap-2">
                             {[
                                 { id: 'linkedin', icon: Linkedin, label: 'LinkedIn Post' },
                                 { id: 'twitter', icon: Twitter, label: 'X Thread' },
                                 { id: 'blog', icon: FileText, label: 'Blog Article' },
                                 { id: 'summary', icon: List, label: 'Summary' }
                             ].map((item) => (
                                 <View key={item.id} className="w-[48%] p-3 rounded-lg border border-zinc-200 bg-white">
                                     <View className="flex-row justify-between mb-1">
                                         <item.icon size={16} color="#18181b" />
                                     </View>
                                     <Text className="text-xs font-medium text-zinc-900">{item.label}</Text>
                                 </View>
                             ))}
                        </View>
                    </View>

                    <View>
                        <Text className="text-xs font-medium text-zinc-700 mb-2">Brand Voice</Text>
                        <View className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg">
                            <Text className="text-sm text-zinc-700">Professional & Authoritative</Text>
                        </View>
                    </View>
                 </View>
            </ScrollView>

            <View className="p-4 border-t border-zinc-200 bg-zinc-50/30">
                <Pressable
                    onPress={handleGenerate}
                    disabled={isGenerating}
                    className={`w-full py-3 rounded-lg flex-row items-center justify-center gap-2 shadow-sm ${isGenerating ? 'bg-zinc-800' : 'bg-zinc-900 active:bg-zinc-800'}`}
                >
                    {isGenerating ? <Loader2 size={16} color="white" className="animate-spin" /> : <Sparkles size={16} color="white" />}
                    <Text className="text-white font-medium text-sm">{isGenerating ? 'Processing...' : 'Generate Content'}</Text>
                </Pressable>
            </View>
        </View>

        {/* Right Panel: Editor */}
        <View className="flex-1 bg-zinc-50 flex-col relative overflow-hidden">
            {/* Toolbar */}
            <View className="h-14 bg-white border-b border-zinc-200 flex-row items-center justify-between px-4 shadow-sm z-20 flex-shrink-0">
                <View className="flex-row items-center gap-4">
                    <View className="flex-row items-center bg-zinc-100 p-1 rounded-lg">
                        {(['summary', 'linkedin', 'twitter'] as const).map((m) => (
                            <Pressable
                                key={m}
                                onPress={() => setMode(m)}
                                className={`px-3 py-1.5 rounded-md ${mode === m ? 'bg-white shadow-sm' : ''}`}
                            >
                                <Text className={`text-xs font-medium ${mode === m ? 'text-zinc-900' : 'text-zinc-500'}`}>
                                    {m.charAt(0).toUpperCase() + m.slice(1)}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                    <View className="h-4 w-px bg-zinc-200" />
                    <View className="flex-row items-center gap-1">
                        <Pressable className="p-1.5"><Bold size={14} color="#a1a1aa" /></Pressable>
                        <Pressable className="p-1.5"><Italic size={14} color="#a1a1aa" /></Pressable>
                        <Pressable className="p-1.5"><Link2 size={14} color="#a1a1aa" /></Pressable>
                    </View>
                </View>

                <View className="flex-row items-center gap-2">
                    {showSave && (
                        <Animated.View entering={FadeIn} className="flex-row items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded">
                            <Check size={12} color="#15803d" />
                            <Text className="text-xs font-medium text-green-700">Saved</Text>
                        </Animated.View>
                    )}
                    <Pressable className="p-2 hover:bg-zinc-100 rounded-lg"><Copy size={16} color="#a1a1aa" /></Pressable>
                    <Pressable className="bg-white border border-zinc-200 px-3 py-1.5 rounded-lg flex-row items-center gap-2 shadow-sm">
                        <Text className="text-xs font-medium text-zinc-700">Export</Text>
                        <Download size={12} color="#3f3f46" />
                    </Pressable>
                </View>
            </View>

            {/* Canvas */}
            <ScrollView className="flex-1 p-8 md:p-12" contentContainerStyle={{ flexGrow: 1 }}>
                {!isGenerating && !generated && (
                    <View className="absolute inset-0 flex-col items-center justify-center p-6">
                        <View className="w-24 h-24 bg-zinc-50 border border-zinc-200 rounded-2xl items-center justify-center mb-6 shadow-sm">
                            <Layout size={32} color="#d4d4d8" />
                        </View>
                        <Text className="text-lg font-semibold text-zinc-900">Workspace Ready</Text>
                        <Text className="text-zinc-500 max-w-sm mt-2 text-sm text-center leading-relaxed">Paste a URL on the left sidebar to start the generation engine. We'll handle the rest.</Text>
                    </View>
                )}

                {isGenerating && (
                    <Animated.View entering={FadeIn} className="max-w-2xl mx-auto mt-20 w-full">
                        <View className="border border-zinc-200 bg-white p-6 rounded-xl shadow-sm mb-6 flex-row items-center gap-4">
                            <View className="w-12 h-12 rounded-full border-2 border-zinc-100 border-t-zinc-900 items-center justify-center">
                                <Loader2 size={24} color="#18181b" className="animate-spin" />
                            </View>
                            <View className="flex-1 gap-1">
                                <View className="flex-row justify-between">
                                    <Text className="text-sm font-semibold text-zinc-900">Analyzing Video Transcript...</Text>
                                    <Text className="text-xs font-mono text-zinc-500">45%</Text>
                                </View>
                                <View className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                                    <Animated.View style={[{ height: '100%', backgroundColor: '#18181b', width: '45%', borderRadius: 999 }, marqueeStyle]} />
                                </View>
                            </View>
                        </View>
                        <View className="gap-4 px-2">
                             <View className="h-8 bg-zinc-200 rounded w-1/3 mb-6 opacity-50" />
                             <View className="h-4 bg-zinc-200 rounded w-full opacity-50" />
                             <View className="h-4 bg-zinc-200 rounded w-full opacity-50" />
                             <View className="h-4 bg-zinc-200 rounded w-5/6 opacity-50" />
                        </View>
                    </Animated.View>
                )}

                {generated && (
                    <Animated.View entering={FadeInDown.duration(400)} className="max-w-[800px] mx-auto bg-white min-h-[1000px] shadow-sm border border-zinc-200 rounded-xl p-12">
                        {renderContent()}
                    </Animated.View>
                )}

                <View className="h-20" />
            </ScrollView>
        </View>
    </View>
  );
}
