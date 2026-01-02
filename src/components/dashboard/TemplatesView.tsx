import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Linkedin, FileText, Twitter } from 'lucide-react-native';

export default function TemplatesView() {
  const TemplateCard = ({ icon: Icon, color, bg, title, desc, tag1, tag2 }: any) => (
    <View className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
        <View className={`h-32 ${bg} items-center justify-center`}>
            <Icon size={40} color={color} style={{ opacity: 0.8 }} />
        </View>
        <View className="p-5">
            <Text className="font-semibold text-zinc-900 text-base">{title}</Text>
            <Text className="text-xs text-zinc-500 mt-1 mb-4">{desc}</Text>
            <View className="flex-row gap-2">
                <View className="bg-zinc-100 px-2 py-1 rounded"><Text className="text-[10px] text-zinc-600">{tag1}</Text></View>
                <View className="bg-zinc-100 px-2 py-1 rounded"><Text className="text-[10px] text-zinc-600">{tag2}</Text></View>
            </View>
        </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-zinc-50 p-6">
        <View className="max-w-6xl mx-auto w-full">
             <Text className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Templates</Text>
             <Text className="text-zinc-500 mb-8">Start with a pre-configured framework for your content.</Text>

             <View className="flex-row flex-wrap gap-6">
                 <View className="w-full md:w-[30%] min-w-[300px]">
                    <TemplateCard
                        icon={Linkedin} color="#2563eb" bg="bg-blue-50"
                        title="Viral Storytelling"
                        desc="Structure your post with a hook, conflict, and resolution."
                        tag1="LinkedIn" tag2="Personal Brand"
                    />
                 </View>
                 <View className="w-full md:w-[30%] min-w-[300px]">
                    <TemplateCard
                        icon={FileText} color="#059669" bg="bg-emerald-50"
                        title="SEO Deep Dive"
                        desc="Long-form article structure optimized for high-volume keywords."
                        tag1="Blog" tag2="Educational"
                    />
                 </View>
                 <View className="w-full md:w-[30%] min-w-[300px]">
                    <TemplateCard
                        icon={Twitter} color="#000000" bg="bg-zinc-100"
                        title="Controversial Take"
                        desc="Thread structure designed to spark debate and engagement."
                        tag1="Twitter/X" tag2="Growth"
                    />
                 </View>
             </View>
        </View>
    </ScrollView>
  );
}
