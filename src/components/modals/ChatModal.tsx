import React from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { X, Send } from 'lucide-react-native';

interface ChatModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-sky-50 p-4 pt-8 flex-row justify-between items-center border-b border-sky-100">
                <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-sky-200 rounded-full items-center justify-center">
                        <Text className="text-xl">🦆</Text>
                    </View>
                    <View>
                        <Text className="font-bold text-gray-800 font-cute text-lg">Bebek Biru</Text>
                        <View className="flex-row items-center gap-1">
                            <View className="w-2 h-2 bg-green-400 rounded-full" />
                            <Text className="text-xs text-sky-500 font-bold">Online</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={onClose} className="w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                    <X size={18} color="#9CA3AF" />
                </TouchableOpacity>
            </View>

            {/* Chat Area */}
            <ScrollView className="flex-1 p-4 bg-white" contentContainerStyle={{ paddingBottom: 20 }}>
                <View className="flex-row gap-3 items-end mb-4">
                    <View className="w-8 h-8 bg-sky-100 rounded-full items-center justify-center">
                        <Text className="text-sm">🦆</Text>
                    </View>
                    <View className="bg-sky-50 p-3 rounded-2xl rounded-bl-none max-w-[80%]">
                        <Text className="text-sm text-gray-700 leading-relaxed font-ui">
                            Halo! Ceritain aja apa yang lagi kamu rasain. Aku di sini buat dengerin kok. Kwek! 💙
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Input */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
                <View className="p-4 bg-gray-50 border-t border-gray-100 flex-row gap-2">
                    <TextInput
                        placeholder="Ketik pesanmu..."
                        className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-3 text-sm font-ui"
                    />
                    <TouchableOpacity className="w-12 h-12 bg-sky-500 rounded-full items-center justify-center shadow-sm">
                        <Send size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    </Modal>
  );
};
