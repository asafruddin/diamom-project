
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { diamomTheme } from '@/theme';

export default function OnboardingIntroScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Onboarding</Text>
        <Text style={styles.title}>Selamat datang di DiaMom</Text>
        <Text style={styles.body}>
          Ceritakan profil kehamilan dan baca batas penggunaan sebelum mulai memakai fitur latihan.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/onboarding/profile')}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
        >
          <Text style={styles.primaryButtonText}>Lanjutkan</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: diamomTheme.colors.background,
  },
  container: {
    flex: 1,
    gap: diamomTheme.spacing.md,
    justifyContent: 'center',
    paddingHorizontal: diamomTheme.spacing.xl,
  },
  eyebrow: {
    color: diamomTheme.colors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  title: {
    color: diamomTheme.colors.text,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
  },
  body: {
    color: diamomTheme.colors.mutedText,
    fontSize: 17,
    lineHeight: 26,
    marginBottom: diamomTheme.spacing.xl,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: diamomTheme.colors.primary,
    borderRadius: 8,
    minHeight: 52,
    justifyContent: 'center',
  },
  primaryButtonPressed: {
    opacity: 0.78,
  },
  primaryButtonText: {
    color: diamomTheme.colors.onPrimary,
    fontSize: 17,
    fontWeight: '800',
  },
});
