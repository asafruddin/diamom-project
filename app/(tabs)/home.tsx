import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { diamomTheme } from '@/theme';

export default function HomeDashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Beranda</Text>
        <Text style={styles.title}>Halo, Ibu</Text>
        <Text style={styles.body}>
          Dashboard DiaMom siap menampilkan latihan, materi, dan riwayat setelah onboarding selesai.
        </Text>
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
  },
});
