import React from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';

export default function SettingsView() {
  return (
    <ScrollView className="flex-1 bg-zinc-50 p-6">
        <View className="max-w-4xl mx-auto w-full">
            <Text className="text-2xl font-bold tracking-tight text-zinc-900 mb-6">Settings</Text>

            <View className="flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <View className="w-full md:w-64 gap-1">
                    {['General', 'Team & Members', 'Billing', 'Integrations', 'API Keys'].map((tab, i) => (
                        <View key={tab} className={`w-full px-3 py-2 rounded-lg ${i === 0 ? 'bg-white shadow-sm border border-zinc-200' : ''}`}>
                            <Text className={`text-sm font-medium ${i === 0 ? 'text-zinc-900' : 'text-zinc-500'}`}>{tab}</Text>
                        </View>
                    ))}
                </View>

                {/* Content */}
                <View className="flex-1 gap-6">
                    {/* Profile */}
                    <View className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                        <Text className="text-base font-semibold text-zinc-900 mb-4">Profile Information</Text>
                        <View className="flex-row items-center gap-6 mb-6">
                            <View className="w-20 h-20 rounded-full bg-zinc-100 items-center justify-center border border-zinc-200">
                                <Text className="text-2xl font-bold text-zinc-400">JD</Text>
                            </View>
                            <View className="gap-2">
                                <Pressable className="px-3 py-1.5 border border-zinc-200 rounded-md bg-white hover:bg-zinc-50">
                                    <Text className="text-xs font-medium text-zinc-700">Change Avatar</Text>
                                </Pressable>
                                <Pressable className="px-3 py-1.5">
                                    <Text className="text-xs font-medium text-red-600">Remove</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View className="gap-4">
                            <View className="gap-1">
                                <Text className="text-xs font-medium text-zinc-700">Full Name</Text>
                                <TextInput value="John Doe" className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm" />
                            </View>
                            <View className="gap-1">
                                <Text className="text-xs font-medium text-zinc-700">Email Address</Text>
                                <TextInput value="john.doe@example.com" className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm" />
                            </View>
                        </View>
                    </View>

                    {/* Preferences */}
                    <View className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                        <Text className="text-base font-semibold text-zinc-900 mb-4">Preferences</Text>
                        <View className="gap-4">
                            <View className="flex-row items-center justify-between py-2">
                                <View>
                                    <Text className="text-sm font-medium text-zinc-900">Email Notifications</Text>
                                    <Text className="text-xs text-zinc-500">Receive weekly digests of your content performance.</Text>
                                </View>
                                <View className="w-9 h-5 bg-zinc-900 rounded-full relative">
                                    <View className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                                </View>
                            </View>
                            <View className="flex-row items-center justify-between py-2 border-t border-zinc-50">
                                <View>
                                    <Text className="text-sm font-medium text-zinc-900">Auto-Save</Text>
                                    <Text className="text-xs text-zinc-500">Automatically save drafts while editing.</Text>
                                </View>
                                <View className="w-9 h-5 bg-zinc-900 rounded-full relative">
                                    <View className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </ScrollView>
  );
}
