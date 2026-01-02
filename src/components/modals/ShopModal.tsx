import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { JuicyButton } from '../JuicyButton';
import { useGame } from '../../context/GameContext';
import { ChevronDown, CircleDollarSign } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface ShopModalProps {
  visible: boolean;
  onClose: () => void;
}

const ITEMS = [
    { id: 'tea', label: 'Teh Hangat', emoji: '🍵', cost: 50, color: 'bg-green-50', border: 'border-green-100' },
    { id: 'blanket', label: 'Selimut', emoji: '🧣', cost: 100, color: 'bg-blue-50', border: 'border-blue-100' },
    { id: 'headphones', label: 'Lo-Fi', emoji: '🎧', cost: 150, color: 'bg-purple-50', border: 'border-purple-100' },
];

export const ShopModal: React.FC<ShopModalProps> = ({ visible, onClose }) => {
  const { coins, buyAccessory, inventory, accessory } = useGame();

  const handleBuy = (item: string, cost: number) => {
      const success = buyAccessory(item, cost);
      if (success) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
            <View className="flex-1 justify-end bg-black/20">
                <TouchableWithoutFeedback>
                    <Animated.View
                        entering={SlideInDown}
                        exiting={SlideOutDown}
                        className="bg-white rounded-t-[40px] p-6 shadow-2xl h-[50%]"
                    >
                        <View className="flex-row justify-between items-center mb-8 px-2">
                            <View>
                                <Text className="text-2xl font-bold text-gray-800 font-cute">Pojok Nyaman</Text>
                                <Text className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bikin bebekmu betah</Text>
                            </View>
                            <TouchableOpacity onPress={onClose} className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                                <ChevronDown color="#6B7280" size={24} />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row flex-wrap gap-4">
                            {ITEMS.map((item) => {
                                const isOwned = inventory.includes(item.id);
                                const isEquipped = accessory === item.id;

                                return (
                                    <JuicyButton
                                        key={item.id}
                                        onPress={() => handleBuy(item.id, item.cost)}
                                        className="w-[30%] items-center gap-2"
                                    >
                                        <View className={`w-full aspect-square ${item.color} border-2 ${item.border} rounded-2xl items-center justify-center relative`}>
                                            <Text className="text-4xl">{item.emoji}</Text>

                                            <View className={`absolute bottom-0 left-0 right-0 h-6 ${isEquipped ? 'bg-blue-100' : isOwned ? 'bg-green-100' : 'bg-white/90'} items-center justify-center flex-row gap-1`}>
                                                {isOwned ? (
                                                    <Text className={`text-[10px] font-bold uppercase ${isEquipped ? 'text-blue-600' : 'text-green-600'}`}>
                                                        {isEquipped ? 'DIPAKAI' : 'MILIKMU'}
                                                    </Text>
                                                ) : (
                                                    <>
                                                        <CircleDollarSign size={10} color="#EAB308" />
                                                        <Text className="text-[10px] font-bold text-gray-600">{item.cost}</Text>
                                                    </>
                                                )}
                                            </View>
                                        </View>
                                        <Text className="text-xs font-bold text-gray-500">{item.label}</Text>
                                    </JuicyButton>
                                );
                            })}
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
  );
};
