import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput, FlatList } from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { JuicyButton } from '../JuicyButton';
import { useGame } from '../../context/GameContext';
import { Save, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface GratitudeModalProps {
  visible: boolean;
  onClose: () => void;
}

export const GratitudeModal: React.FC<GratitudeModalProps> = ({ visible, onClose }) => {
  const { saveGratitude, gratitudeList } = useGame();
  const [text, setText] = useState('');

  const handleSave = () => {
    if (text.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      saveGratitude(text);
      setText('');
    }
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-orange-100/90">
            <TouchableWithoutFeedback>
                <Animated.View
                    entering={ZoomIn.duration(300)}
                    exiting={ZoomOut.duration(300)}
                    className="w-full max-w-sm"
                >
                    <View className="bg-white m-6 rounded-[40px] p-6 border-8 border-white shadow-2xl relative h-[500px]">
                        <TouchableOpacity onPress={onClose} className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full items-center justify-center z-10">
                            <X color="#9CA3AF" size={20} />
                        </TouchableOpacity>

                        <View className="items-center mb-6 mt-2">
                            <View className="w-20 h-20 bg-orange-100 rounded-full items-center justify-center mb-4 shadow-inner">
                                <Text className="text-4xl">🍯</Text>
                            </View>
                            <Text className="text-2xl font-bold text-orange-900 font-cute">Toples Syukur</Text>
                            <Text className="text-orange-700/70 text-sm mt-1">Simpan kenangan manismu di sini.</Text>
                        </View>

                        <TextInput
                            value={text}
                            onChangeText={setText}
                            placeholder="Hari ini aku bersyukur karena..."
                            multiline
                            numberOfLines={3}
                            className="w-full bg-orange-50 border-2 border-orange-100 rounded-2xl p-4 text-lg font-hand text-gray-700 mb-4"
                            textAlignVertical="top"
                        />

                        <JuicyButton
                            onPress={handleSave}
                            className="w-full bg-orange-400 p-4 rounded-2xl shadow-lg flex-row items-center justify-center gap-2 mb-6"
                        >
                            <Save color="white" size={18} />
                            <Text className="text-white font-bold font-ui">SIMPAN KENANGAN</Text>
                        </JuicyButton>

                        <View className="flex-1 border-t border-dashed border-gray-200 pt-4 w-full">
                            <View className="flex-row justify-between items-center mb-3">
                                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider">Isi Toplesmu</Text>
                                <View className="bg-orange-100 px-2 py-0.5 rounded-full">
                                    <Text className="text-xs text-orange-600 font-bold">{gratitudeList.length}</Text>
                                </View>
                            </View>

                            <FlatList
                                data={gratitudeList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View className="bg-orange-50 p-3 rounded-xl border border-orange-100 mb-2 flex-row gap-2">
                                        <Text className="text-orange-400 text-xs mt-1">✨</Text>
                                        <Text className="font-hand text-lg text-gray-600 leading-tight flex-1">{item}</Text>
                                    </View>
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
