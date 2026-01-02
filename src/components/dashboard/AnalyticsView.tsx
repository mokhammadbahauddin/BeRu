import React from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { Eye, MousePointer2, Clock, CheckCircle, TrendingUp, TrendingDown, Download } from 'lucide-react-native';

export default function AnalyticsView() {
  const StatCard = ({ icon: Icon, color, bg, label, value, trend, trendUp }: any) => (
    <View className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm flex-1 min-w-[200px]">
        <View className="flex-row justify-between items-start mb-4">
            <View className={`p-2 rounded-lg ${bg}`}>
                <Icon size={16} color={color} />
            </View>
            <View className={`px-2 py-0.5 rounded-full flex-row items-center gap-1 ${trendUp === false ? 'bg-red-50' : 'bg-green-50'}`}>
                {trendUp === false ? <TrendingDown size={12} color="#dc2626" /> : <TrendingUp size={12} color="#16a34a" />}
                <Text className={`text-xs font-medium ${trendUp === false ? 'text-red-600' : 'text-green-600'}`}>{trend}</Text>
            </View>
        </View>
        <Text className="text-2xl font-bold text-zinc-900 mb-1">{value}</Text>
        <Text className="text-xs text-zinc-500">{label}</Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-zinc-50 p-6" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="max-w-6xl mx-auto w-full gap-6">
            <View className="flex-row justify-between items-center">
                <View>
                    <Text className="text-2xl font-bold tracking-tight text-zinc-900">Performance Analytics</Text>
                    <Text className="text-sm text-zinc-500 mt-1">Track the engagement of your repurposed content.</Text>
                </View>
                <View className="flex-row gap-2">
                    <View className="bg-white border border-zinc-200 rounded-lg px-3 py-2">
                        <Text className="text-sm text-zinc-700">Last 30 Days</Text>
                    </View>
                    <View className="bg-white border border-zinc-200 rounded-lg px-3 py-2 flex-row gap-2 items-center">
                        <Download size={14} color="#3f3f46" />
                        <Text className="text-sm text-zinc-700">Export Report</Text>
                    </View>
                </View>
            </View>

            {/* Stats Grid */}
            <View className="flex-row flex-wrap gap-4">
                <StatCard icon={Eye} color="#2563eb" bg="bg-blue-50" label="Total Impressions" value="124.5K" trend="+12%" />
                <StatCard icon={MousePointer2} color="#9333ea" bg="bg-purple-50" label="Avg. CTR" value="8.2%" trend="+5.2%" />
                <StatCard icon={Clock} color="#ea580c" bg="bg-orange-50" label="Avg. Read Time" value="1m 45s" trend="-1.4%" trendUp={false} />
                <StatCard icon={CheckCircle} color="#52525b" bg="bg-zinc-100" label="Posts Generated" value="45" trend="Neutral" trendUp={true} />
            </View>

            {/* Charts & Lists */}
            <View className="flex-col lg:flex-row gap-6">
                <View className="flex-[2] bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                    <Text className="font-semibold text-zinc-900 mb-6">Engagement Trends</Text>
                    <View className="h-64 w-full flex-row items-end justify-between gap-2 px-2">
                         {[30, 50, 45, 70, 85, 60, 40].map((h, i) => (
                             <View key={i} className={`w-full rounded-t transition-all ${i === 4 ? 'bg-zinc-800' : 'bg-zinc-100 hover:bg-zinc-200'}`} style={{ height: `${h}%` }} />
                         ))}
                    </View>
                    <View className="flex-row justify-between mt-4">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                            <Text key={d} className="text-xs text-zinc-400">{d}</Text>
                        ))}
                    </View>
                </View>

                <View className="flex-1 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                    <Text className="font-semibold text-zinc-900 mb-6">Top Performing</Text>
                    <View className="gap-4">
                        {[
                            { id: 1, title: '10 Ways to Scale SaaS', sub: 'LinkedIn • 45k views', rank: 1, up: true },
                            { id: 2, title: 'AI Ethics Thread', sub: 'Twitter • 32k views', rank: 2, up: false },
                            { id: 3, title: 'Product Launch Recap', sub: 'Blog • 12k views', rank: 3, up: false },
                        ].map(item => (
                            <View key={item.id} className="flex-row items-center gap-3">
                                <View className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs ${item.rank === 1 ? 'bg-blue-50 text-blue-600' : 'bg-zinc-50 text-zinc-500'}`}>{item.rank}</View>
                                <View className="flex-1">
                                    <Text className="text-sm font-medium text-zinc-900" numberOfLines={1}>{item.title}</Text>
                                    <Text className="text-xs text-zinc-500">{item.sub}</Text>
                                </View>
                                {item.up && <TrendingUp size={16} color="#22c55e" />}
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    </ScrollView>
  );
}
