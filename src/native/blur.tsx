import React from 'react';
import { View, ViewProps } from 'react-native';
export type BlurTint = 'light' | 'dark' | 'default';
export function BlurView({ children, style, ...props }: ViewProps & { tint?: BlurTint; intensity?: number }) {
  return <View {...props} style={style}>{children}</View>;
}
