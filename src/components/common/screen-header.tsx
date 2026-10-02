import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/lib/theme-store";

interface ScreenHeaderProps {
  kicker: string;
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export function ScreenHeader({ kicker, title, subtitle, rightAction }: ScreenHeaderProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.header}>
      <View style={styles.titleArea}>
        <View style={styles.kickerRow}>
          <View style={[styles.kickerRule, { backgroundColor: colors.primary }]} />
          <Text style={[styles.kicker, { color: colors.primary }]}>{kicker}</Text>
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>
          {title}<Text style={[styles.dot, { color: colors.primary }]}>.</Text>
        </Text>
        {subtitle ? <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text> : null}
      </View>
      {rightAction ? <View style={styles.rightAction}>{rightAction}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingTop: 12, marginBottom: 22 },
  titleArea: { flex: 1, paddingRight: 12 },
  kickerRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  kickerRule: { width: 18, height: 2, borderRadius: 2 },
  kicker: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  title: { fontFamily: "Fraunces_700Bold", fontSize: 34, fontWeight: "700", letterSpacing: -1.4, marginTop: 8 },
  dot: { fontWeight: "700" },
  subtitle: { fontSize: 12, lineHeight: 18, marginTop: 6, maxWidth: 310 },
  rightAction: { alignItems: "center", justifyContent: "center", paddingTop: 4 },
});
