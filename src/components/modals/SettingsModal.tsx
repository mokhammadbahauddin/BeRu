import React from 'react';
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import { useGame } from '../../context/GameContext';
import { X, Trash2 } from 'lucide-react-native';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
  const { resetData } = useGame();

  const handleReset = () => {
    Alert.alert(
      "Reset Data?",
      "Are you sure you want to delete all progress? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Everything",
          style: "destructive",
          onPress: () => {
             resetData();
             onClose();
          }
        }
      ]
    );
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
        <View className="flex-1 bg-black/50 justify-center items-center p-6">
            <View className="bg-white w-full max-w-sm rounded-3xl p-6">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-xl font-bold font-cute text-gray-800">Settings</Text>
                    <TouchableOpacity onPress={onClose} className="bg-gray-100 p-2 rounded-full">
                        <X size={20} color="#374151" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={handleReset}
                    className="flex-row items-center gap-3 bg-red-50 p-4 rounded-xl border border-red-100"
                >
                    <Trash2 size={24} color="#EF4444" />
                    <View>
                        <Text className="font-bold text-red-600 font-ui">Reset Data</Text>
                        <Text className="text-xs text-red-400">Clear progress & inventory</Text>
                    </View>
                </TouchableOpacity>

                <View className="mt-6 border-t border-gray-100 pt-4 items-center">
                    <Text className="text-xs text-gray-400 font-ui">Bebek Biru v1.0.0</Text>
                    <Text className="text-[10px] text-gray-300 mt-1">Made with 💙 & 🦆</Text>
                </View>
            </View>
        </View>
    </Modal>
  );
};
