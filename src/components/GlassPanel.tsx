import React from 'react';
import { View, Platform, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { styled } from 'nativewind';

interface GlassPanelProps extends ViewProps {
  className?: string;
  intensity?: number;
  children: React.ReactNode;
}

const StyledBlurView = styled(BlurView);
const StyledView = styled(View);

export const GlassPanel: React.FC<GlassPanelProps> = ({ className, intensity = 20, children, ...props }) => {
  if (Platform.OS === 'android') {
    // Android fallback: translucent background
    return (
      <StyledView
        className={`bg-white/80 border-2 border-white/80 ${className}`}
        {...props}
      >
        {children}
      </StyledView>
    );
  }

  return (
    <StyledBlurView
      intensity={intensity}
      tint="light"
      className={`overflow-hidden border-2 border-white/80 ${className}`}
      {...props}
    >
      <View className="bg-white/40 flex-1">
        {children}
      </View>
    </StyledBlurView>
  );
};
