
import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useProfileStore } from '@/features/onboarding/profile-store';
import { SAFETY_WARNING_SIGNS } from '@/constants/safety';
import { diamomTheme } from '@/theme';

export default function OnboardingSafetyScreeningScreen() {
  const saveSafetyScreening = useProfileStore((state) => state.saveSafetyScreening);
  const [selectedSigns, setSelectedSigns] = useState<Record<string, boolean>>({});

  const toggleSign = (id: string) => {
    setSelectedSigns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    const signs = Object.keys(selectedSigns).filter((key) => selectedSigns[key]);
    saveSafetyScreening(signs);
    router.push('/(tabs)/home' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Skrining Keamanan</Text>
        <Text style={styles.subtitle}>
          Apakah Anda saat ini mengalami atau memiliki kondisi berikut? Pilih semua yang sesuai.
        </Text>

        <View style={styles.list}>
          {SAFETY_WARNING_SIGNS.map((sign) => {
            const isSelected = !!selectedSigns[sign.id];
            return (
              <Pressable
                key={sign.id}
                style={[styles.checkboxRow, isSelected && styles.checkboxRowSelected]}
                onPress={() => toggleSign(sign.id)}
              >
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]} />
                <Text style={styles.label}>{sign.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Selesai Skrining</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: diamomTheme.colors.background },
  container: { padding: diamomTheme.spacing.xl, gap: diamomTheme.spacing.md },
  title: { fontSize: 32, fontWeight: 'bold', color: diamomTheme.colors.text },
  subtitle: { fontSize: 16, color: diamomTheme.colors.mutedText, marginBottom: diamomTheme.spacing.md, lineHeight: 22 },
  list: { gap: 12 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, gap: 12 },
  checkboxRowSelected: { borderColor: diamomTheme.colors.primary, backgroundColor: '#f0f4ff' },
  checkbox: { width: 24, height: 24, borderRadius: 4, borderWidth: 2, borderColor: '#aaa' },
  checkboxSelected: { backgroundColor: diamomTheme.colors.primary, borderColor: diamomTheme.colors.primary },
  label: { fontSize: 16, color: diamomTheme.colors.text, flex: 1, lineHeight: 22 },
  button: { backgroundColor: diamomTheme.colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  buttonText: { color: diamomTheme.colors.onPrimary, fontSize: 16, fontWeight: 'bold' }
});
