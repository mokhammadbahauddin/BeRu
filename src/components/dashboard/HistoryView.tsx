import React from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { Search, Video, Mic, FileText, MoreHorizontal } from 'lucide-react-native';

const HISTORY_DATA = [
    { id: 1, name: "Alex Hormozi - $100M Leads", source: "YouTube", platform: "LinkedIn", status: "Published", date: "2 hours ago", type: "video" },
    { id: 2, name: "MKBHD - iPhone 15 Review", source: "YouTube", platform: "Blog", status: "Draft", date: "1 day ago", type: "video" },
    { id: 3, name: "Q4 Marketing Strategy", source: "Upload", platform: "Summary", status: "Completed", date: "3 days ago", type: "file" },
    { id: 4, name: "Lex Fridman #302", source: "Podcast", platform: "Twitter", status: "Scheduled", date: "5 days ago", type: "audio" },
];

export default function HistoryView() {
  return (
    <ScrollView className="flex-1 bg-white p-6">
        <View className="max-w-6xl mx-auto w-full">
            <View className="flex-row justify-between items-center mb-6">
                 <Text className="text-2xl font-bold tracking-tight text-zinc-900">History</Text>
                 <View className="relative">
                     <View className="absolute left-3 top-2.5 z-10"><Search size={16} color="#a1a1aa" /></View>
                     <TextInput placeholder="Search archives..." className="pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm w-64" />
                 </View>
            </View>

            <View className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                <View className="flex-row bg-zinc-50 border-b border-zinc-200 px-6 py-3">
                    <Text className="flex-[2] text-sm font-medium text-zinc-500">Content Title</Text>
                    <Text className="flex-1 text-sm font-medium text-zinc-500">Source</Text>
                    <Text className="flex-1 text-sm font-medium text-zinc-500">Created</Text>
                    <Text className="flex-1 text-sm font-medium text-zinc-500">Status</Text>
                    <Text className="w-10 text-right text-sm font-medium text-zinc-500">Action</Text>
                </View>
                {HISTORY_DATA.map((item) => (
                    <View key={item.id} className="flex-row items-center px-6 py-4 border-b border-zinc-50 hover:bg-zinc-50">
                        <View className="flex-[2] flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded bg-zinc-100 items-center justify-center">
                                {item.type === 'video' ? <Video size={16} color="#71717a" /> :
                                 item.type === 'audio' ? <Mic size={16} color="#71717a" /> :
                                 <FileText size={16} color="#71717a" />}
                            </View>
                            <Text className="font-medium text-zinc-900 text-sm">{item.name}</Text>
                        </View>
                        <Text className="flex-1 text-sm text-zinc-500">{item.source}</Text>
                        <Text className="flex-1 text-sm text-zinc-500">{item.date}</Text>
                        <View className="flex-1 flex-row">
                            <View className={`px-2.5 py-0.5 rounded-full border flex-row items-center gap-1.5 ${item.status === 'Published' ? 'bg-green-50 border-green-200' : 'bg-zinc-100 border-zinc-200'}`}>
                                <View className={`w-1.5 h-1.5 rounded-full ${item.status === 'Published' ? 'bg-green-500' : 'bg-zinc-400'}`} />
                                <Text className={`text-xs font-medium ${item.status === 'Published' ? 'text-green-700' : 'text-zinc-600'}`}>{item.status}</Text>
                            </View>
                        </View>
                        <Pressable className="w-10 items-end">
                            <MoreHorizontal size={16} color="#a1a1aa" />
                        </Pressable>
                    </View>
                ))}
            </View>
        </View>
    </ScrollView>
  );
}
