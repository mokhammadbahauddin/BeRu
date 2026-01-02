import React, { useState, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { X, Send } from 'lucide-react-native';
import { getChatReply } from '../../services/ai';
import { playSound } from '../../services/audio';

interface ChatModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Message {
    id: number;
    role: 'user' | 'assistant';
    text: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({ visible, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
      { id: 1, role: 'assistant', text: 'Halo! Ceritain aja apa yang lagi kamu rasain. Aku di sini buat dengerin kok. Kwek! 💙' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
      if (!inputText.trim()) return;

      const userMsg: Message = { id: Date.now(), role: 'user', text: inputText };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');
      setLoading(true);
      playSound('pop');

      // AI Call
      // Convert messages to history format for service
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const replyText = await getChatReply(history, userMsg.text);

      const botMsg: Message = { id: Date.now() + 1, role: 'assistant', text: replyText };
      setMessages(prev => [...prev, botMsg]);
      setLoading(false);
      playSound('success');
  };

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
            <ScrollView
                ref={scrollViewRef}
                className="flex-1 p-4 bg-white"
                contentContainerStyle={{ paddingBottom: 20 }}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {messages.map((msg) => (
                    <View key={msg.id} className={`flex-row gap-3 items-end mb-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'assistant' && (
                            <View className="w-8 h-8 bg-sky-100 rounded-full items-center justify-center">
                                <Text className="text-sm">🦆</Text>
                            </View>
                        )}
                        <View className={`p-3 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-sky-500 rounded-br-none' : 'bg-sky-50 rounded-bl-none'}`}>
                            <Text className={`text-sm leading-relaxed font-ui ${msg.role === 'user' ? 'text-white' : 'text-gray-700'}`}>
                                {msg.text}
                            </Text>
                        </View>
                    </View>
                ))}
                {loading && (
                    <View className="flex-row gap-3 items-end mb-4">
                         <View className="w-8 h-8 bg-sky-100 rounded-full items-center justify-center">
                            <Text className="text-sm">🦆</Text>
                        </View>
                        <View className="bg-sky-50 p-3 rounded-2xl rounded-bl-none">
                             <ActivityIndicator color="#0ea5e9" size="small" />
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Input */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
                <View className="p-4 bg-gray-50 border-t border-gray-100 flex-row gap-2">
                    <TextInput
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Ketik pesanmu..."
                        className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-3 text-sm font-ui"
                    />
                    <TouchableOpacity onPress={handleSend} disabled={loading} className={`w-12 h-12 rounded-full items-center justify-center shadow-sm ${loading ? 'bg-gray-300' : 'bg-sky-500'}`}>
                        <Send size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    </Modal>
  );
};
