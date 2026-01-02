import React, { useState } from 'react';
import { View, Platform, Pressable, Text } from 'react-native';
import Sidebar from '../components/dashboard/Sidebar';
import HomeView from '../components/dashboard/HomeView';
import AnalyticsView from '../components/dashboard/AnalyticsView';
import SettingsView from '../components/dashboard/SettingsView';
import HistoryView from '../components/dashboard/HistoryView';
import TemplatesView from '../components/dashboard/TemplatesView';
import { Menu, Infinity as InfinityIcon } from 'lucide-react-native';

type TabId = 'home' | 'history' | 'templates' | 'analytics' | 'seo' | 'settings';

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Web-only style helper
  const webStyle = (style: any) => Platform.OS === 'web' ? style : {};

  return (
    <View className="flex-1 flex-row h-screen bg-zinc-50 overflow-hidden">
        {/* Sidebar (Desktop) */}
        <Sidebar activeTab={activeTab} onSwitchTab={setActiveTab} />

        {/* Main Content Area */}
        <View className="flex-1 flex-col h-full relative">

            {/* Mobile Header */}
            <View className="h-14 bg-white border-b border-zinc-200 flex-row md:hidden items-center justify-between px-4 z-20 flex-shrink-0">
                <View className="flex-row items-center gap-2">
                    <View className="w-6 h-6 bg-zinc-900 rounded-md items-center justify-center shadow-sm">
                        <InfinityIcon size={14} color="white" />
                    </View>
                    <Text className="font-bold tracking-tight text-zinc-900">ViralLoop</Text>
                </View>
                <Pressable onPress={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                    <Menu size={20} color="#71717a" />
                </Pressable>
            </View>

            {/* View Switching Logic */}
            <View className="flex-1 relative">
                {activeTab === 'home' && <HomeView />}
                {activeTab === 'analytics' && <AnalyticsView />}
                {activeTab === 'settings' && <SettingsView />}
                {activeTab === 'history' && <HistoryView />}
                {activeTab === 'templates' && <TemplatesView />}

                {/* Placeholders for incomplete tabs */}
                {(activeTab === 'seo') && (
                    <View className="flex-1 items-center justify-center p-8">
                        <Text className="text-zinc-400">This module is under construction.</Text>
                    </View>
                )}
            </View>
        </View>
    </View>
  );
}
