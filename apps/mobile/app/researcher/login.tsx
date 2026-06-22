import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

import {
  ActionButton,
  DiaScreen,
  PageHeader,
  SurfaceCard,
} from "@/components/dia-ui";
import { FormField } from "@/components/forms";
import { loginResearcher } from "@/features/research/research-api";
import { useResearcherAuthStore } from "@/features/research/researcher-auth-store";
import { diamomTheme } from "@/theme";

export default function ResearcherLoginScreen() {
  const setSession = useResearcherAuthStore((state) => state.setSession);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const session = await loginResearcher({ password, username });
      await setSession(session);
      router.replace("/researcher/dashboard");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Login peneliti tidak berhasil.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Peneliti"
        showBack
        title="Masuk Peneliti"
        description="Akses dashboard penelitian DiaMom dengan akun peneliti."
      />

      <SurfaceCard style={styles.formCard}>
        <FormField
          accessibilityLabel="Username peneliti"
          autoCapitalize="none"
          label="Username"
          onChangeText={setUsername}
          placeholder="Masukkan username"
          value={username}
        />
        <FormField
          accessibilityLabel="Password peneliti"
          autoCapitalize="none"
          inputProps={{ secureTextEntry: true }}
          label="Password"
          onChangeText={setPassword}
          placeholder="Masukkan password"
          value={password}
        />
      </SurfaceCard>

      {error ? (
        <SurfaceCard style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
        </SurfaceCard>
      ) : null}

      <ActionButton
        label={isSubmitting ? "Memeriksa..." : "Masuk"}
        onPress={handleLogin}
      />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  errorCard: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderColor: diamomTheme.colors.danger,
  },
  errorText: {
    color: diamomTheme.colors.danger,
    fontSize: 14,
    lineHeight: 20,
  },
  formCard: {
    gap: diamomTheme.spacing.md,
  },
});
