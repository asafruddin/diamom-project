
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getInitialDiaMomRoute } from '@/features/entry/entry-routing';
import { useProfileStore } from '@/features/onboarding/profile-store';
import { diamomTheme } from '@/theme';

export default function DiaMomEntryScreen() {
  const hasCompletedProfile = useProfileStore((state) => state.hasCompletedProfile);
  const hasAcceptedDisclaimer = useProfileStore((state) => state.hasAcceptedDisclaimer);
  const hasCompletedSafetyScreening = useProfileStore((state) => state.hasCompletedSafetyScreening);

  const handleStart = () => {
    const route = getInitialDiaMomRoute({
      hasCompletedProfile,
      hasAcceptedDisclaimer,
      hasCompletedSafetyScreening,
    });
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.identityMark}>
          <Text style={styles.identityInitials}>DM</Text>
        </View>

        <View style={styles.copyGroup}>
          <Text style={styles.eyebrow}>Pendamping ibu hamil</Text>
          <Text style={styles.title}>DiaMom</Text>
          <Text style={styles.subtitle}>
            Ruang belajar dan latihan pernapasan yang membantu ibu mengenal tubuhnya dengan tenang.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Mulai menggunakan DiaMom"
          onPress={handleStart}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
        >
          <Text style={styles.primaryButtonText}>Mulai</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: diamomTheme.colors.background },
  container: { flex: 1, justifyContent: 'center', gap: diamomTheme.spacing.xl, paddingHorizontal: diamomTheme.spacing.xl },
  identityMark: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: diamomTheme.colors.primary, borderRadius: 8, height: 64, justifyContent: 'center', width: 64 },
  identityInitials: { color: diamomTheme.colors.onPrimary, fontSize: 22, fontWeight: '800' },
  copyGroup: { gap: diamomTheme.spacing.sm },
  eyebrow: { color: diamomTheme.colors.accent, fontSize: 15, fontWeight: '700' },
  title: { color: diamomTheme.colors.text, fontSize: 44, fontWeight: '800', lineHeight: 52 },
  subtitle: { color: diamomTheme.colors.mutedText, fontSize: 17, lineHeight: 26, maxWidth: 360 },
  primaryButton: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: diamomTheme.colors.primary, borderRadius: 8, minHeight: 52, minWidth: 132, justifyContent: 'center', paddingHorizontal: diamomTheme.spacing.lg },
  primaryButtonPressed: { opacity: 0.78 },
  primaryButtonText: { color: diamomTheme.colors.onPrimary, fontSize: 17, fontWeight: '800' },
});
