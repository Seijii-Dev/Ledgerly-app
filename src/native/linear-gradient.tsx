import React from 'react';
import { View, ViewProps } from 'react-native';
export function LinearGradient({ children, style, ...props }: ViewProps & { colors?: string[]; start?: unknown; end?: unknown }) {
  return <View {...props} style={style}>{children}</View>;
}
