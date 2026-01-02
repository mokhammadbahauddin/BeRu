import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import {
  Infinity as InfinityIcon,
  PlusCircle,
  Clock,
  LayoutGrid,
  BarChart2,
  Search,
  Users,
  FolderClosed,
  Settings
} from 'lucide-react-native';
import { useApp } from '../../context/AppContext';

type TabId = 'home' | 'history' | 'templates' | 'analytics' | 'seo' | 'settings';

interface SidebarProps {
  activeTab: TabId;
  onSwitchTab: (tab: TabId) => void;
}

export default function Sidebar({ activeTab, onSwitchTab }: SidebarProps) {
  const { credits } = useApp();

  const NavItem = ({ id, icon: Icon, label, badge }: { id: TabId, icon: any, label: string, badge?: boolean }) => {
    const isActive = activeTab === id;
    return (
      <Pressable
        onPress={() => onSwitchTab(id)}
        className={`w-full flex-row items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${isActive ? 'bg-zinc-100' : 'hover:bg-zinc-50'}`}
      >
        <Icon size={16} color={isActive ? '#18181b' : '#a1a1aa'} />
        <Text className={`text-sm font-medium ${isActive ? 'text-zinc-900' : 'text-zinc-500'}`}>{label}</Text>
        {badge && <View className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
      </Pressable>
    );
  };

  return (
    <View className="w-[280px] bg-white border-r border-zinc-200 flex-col z-30 hidden md:flex h-full">
      {/* Header */}
      <View className="p-4 h-14 flex-row items-center border-b border-zinc-100">
        <View className="flex-row items-center gap-2">
          <View className="w-6 h-6 bg-zinc-900 rounded-md items-center justify-center shadow-sm">
            <InfinityIcon size={14} color="white" />
          </View>
          <Text className="font-bold text-sm tracking-tight text-zinc-900">ViralLoop</Text>
          <View className="bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 ml-auto">
            <Text className="text-[10px] text-zinc-500 font-mono">PRO</Text>
          </View>
        </View>
      </View>

      {/* Navigation */}
      <ScrollView className="flex-1 p-3" contentContainerStyle={{ gap: 24 }}>
        {/* Main Group */}
        <View className="gap-0.5">
          <NavItem id="home" icon={PlusCircle} label="New Project" />
          <NavItem id="history" icon={Clock} label="History" />
          <NavItem id="templates" icon={LayoutGrid} label="Templates" />
        </View>

        {/* Intelligence Group */}
        <View>
          <Text className="px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Intelligence</Text>
          <View className="gap-0.5">
            <NavItem id="analytics" icon={BarChart2} label="Analytics" />
            <NavItem id="seo" icon={Search} label="SEO Keyword Tracker" />
          </View>
        </View>

        {/* Workspace Group */}
        <View>
          <Text className="px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Workspace</Text>
          <View className="gap-0.5">
            <Pressable className="w-full flex-row items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-50">
                <Users size={16} color="#a1a1aa" />
                <Text className="text-sm font-medium text-zinc-500">Team Members</Text>
                <View className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
            </Pressable>
            <Pressable className="w-full flex-row items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-50">
                <FolderClosed size={16} color="#a1a1aa" />
                <Text className="text-sm font-medium text-zinc-500">Assets</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Footer / Usage */}
      <View className="p-4 border-t border-zinc-100 bg-zinc-50/50">
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-1.5">
            <Text className="text-[11px] font-medium text-zinc-600">Credits Used</Text>
            <Text className="text-[11px] font-mono text-zinc-500">{credits}/1000</Text>
          </View>
          <View className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
            <View className="bg-zinc-800 h-full rounded-full" style={{ width: `${(credits / 1000) * 100}%` }} />
          </View>
        </View>

        <Pressable onPress={() => onSwitchTab('settings')} className="flex-row items-center gap-3 w-full p-2 hover:bg-white border border-transparent hover:border-zinc-200 hover:shadow-sm rounded-lg transition-all">
          <View className="relative">
             <View className="w-8 h-8 rounded-full bg-zinc-200 items-center justify-center border border-zinc-200 shadow-sm">
                <Text className="text-xs font-semibold text-zinc-600">JD</Text>
             </View>
             <View className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </View>
          <View className="flex-1 overflow-hidden">
            <Text className="text-sm font-medium text-zinc-900" numberOfLines={1}>John Doe</Text>
            <Text className="text-[10px] text-zinc-500" numberOfLines={1}>john@example.com</Text>
          </View>
          <Settings size={16} color="#a1a1aa" />
        </Pressable>
      </View>
    </View>
  );
}
