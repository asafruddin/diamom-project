import { Redirect, router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  ActionButton,
  DiaScreen,
  PageHeader,
  SurfaceCard,
} from "@/components/dia-ui";
import { DilationSelector, FormField } from "@/components/forms";
import { useProfileStore } from "@/features/onboarding/profile-store";
import {
  type MotherIdentityFormValues,
  validateMotherIdentity,
} from "@/features/onboarding/validation";
import { diamomTheme } from "@/theme";

type FieldKey = keyof MotherIdentityFormValues;

export default function OnboardingProfileScreen() {
  const saveMotherIdentity = useProfileStore(
    (state) => state.saveMotherIdentity,
  );
  const hasAcceptedDisclaimer = useProfileStore(
    (state) => state.hasAcceptedDisclaimer,
  );
  const [values, setValues] = useState<MotherIdentityFormValues>({
    age: "",
    dilationCm: null,
    gpa: "",
    motherName: "",
    pregnancyWeek: "",
  });
  const [errors, setErrors] = useState<Record<FieldKey, string | undefined>>({
    age: undefined,
    dilationCm: undefined,
    gpa: undefined,
    motherName: undefined,
    pregnancyWeek: undefined,
  });

  const updateValue = (key: FieldKey, value: string | number | null) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleContinue = () => {
    const result = validateMotherIdentity(values);
    setErrors(result.errors);

    if (!result.isValid) {
      return;
    }

    saveMotherIdentity(result.value);
    router.push("/onboarding/safety-screening");
  };

  if (!hasAcceptedDisclaimer) {
    return <Redirect href="/onboarding/consent" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardView}
    >
      <DiaScreen contentContainerStyle={styles.container}>
        <PageHeader
          eyebrow="Identitas Ibu"
          showBack
          title="Data Ibu Bersalin"
          description="Isi data dasar sebelum skrining keamanan. Data ini tersimpan lokal di perangkat dan tidak dikirim ke server."
        />

        <SurfaceCard style={styles.formCard}>
          <FormField
            error={errors.motherName}
            label="Nama"
            onChangeText={(text) => updateValue("motherName", text)}
            placeholder="Nama ibu"
            value={values.motherName}
          />
          <View style={styles.twoColumn}>
            <View style={styles.flex1}>
              <FormField
                error={errors.age}
                keyboardType="number-pad"
                label="Umur"
                onChangeText={(text) => updateValue("age", text)}
                placeholder="Tahun"
                value={values.age}
              />
            </View>
            <View style={styles.flex1}>
              <FormField
                autoCapitalize="characters"
                error={errors.gpa}
                label="GPA"
                onChangeText={(text) => updateValue("gpa", text)}
                placeholder="Ct: G3P2A0"
                value={values.gpa}
              />
            </View>
          </View>
          <FormField
            error={errors.pregnancyWeek}
            keyboardType="number-pad"
            label="Usia Kehamilan"
            onChangeText={(text) => updateValue("pregnancyWeek", text)}
            placeholder="Minggu"
            rightLabel="minggu"
            value={values.pregnancyWeek}
          />
        </SurfaceCard>

        <SurfaceCard style={styles.dilationCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pembukaan</Text>
            <Text style={styles.sectionDescription}>
              Pilih angka sesuai informasi terakhir dari bidan atau tenaga
              kesehatan.
            </Text>
          </View>
          <DilationSelector
            value={values.dilationCm}
            onChange={(option) => updateValue("dilationCm", option)}
            error={errors.dilationCm}
          />
        </SurfaceCard>

        <SurfaceCard style={styles.noteCard}>
          <Text style={styles.noteText}>
            DiaMom hanya membantu edukasi dan dukungan. Ikuti arahan dokter,
            bidan, atau tenaga kesehatan, dan hentikan aktivitas bila merasa
            tidak aman atau tidak nyaman.
          </Text>
        </SurfaceCard>

        <ActionButton
          accessibilityLabel="Lanjutkan ke skrining keamanan"
          label="LANJUTKAN"
          onPress={handleContinue}
        />
      </DiaScreen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    paddingBottom: diamomTheme.spacing.xxl,
  },
  formCard: {
    gap: diamomTheme.spacing.md,
  },
  twoColumn: {
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
  },
  flex1: {
    flex: 1,
  },
  sectionHeader: {
    gap: diamomTheme.spacing.xs,
  },
  sectionTitle: {
    color: diamomTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  sectionDescription: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  dilationCard: {
    gap: diamomTheme.spacing.md,
  },
  noteCard: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
  },
  noteText: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 21,
  },
});
