import React from 'react';
import { View, Text, Platform } from 'react-native';
import { useApp } from '../context/AppContext';
import { Info, CheckCircle, AlertCircle, X } from 'lucide-react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  // Web-only absolute positioning fix if needed, though 'absolute' usually works fine in RNWeb
  const wrapperStyle = Platform.OS === 'web' ? { position: 'fixed' as any, top: 24, right: 24, zIndex: 50 } : { position: 'absolute' as 'absolute', top: 60, right: 20, zIndex: 100 };

  return (
    <View style={wrapperStyle} pointerEvents="box-none">
      {toasts.map((toast) => (
        <Animated.View
          key={toast.id}
          entering={FadeInUp}
          exiting={FadeOutUp}
          className={`flex-row items-center gap-3 px-4 py-3 rounded-lg shadow-lg mb-3 min-w-[300px] border ${
            toast.type === 'success' ? 'bg-zinc-900 border-zinc-800' :
            toast.type === 'error' ? 'bg-white border-red-200' : 'bg-white border-zinc-200'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle size={16} color="white" /> :
           toast.type === 'error' ? <AlertCircle size={16} color="#dc2626" /> :
           <Info size={16} color="#71717a" />}

          <Text className={`text-sm font-medium flex-1 ${toast.type === 'success' ? 'text-white' : 'text-zinc-900'}`}>
            {toast.message}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
}
