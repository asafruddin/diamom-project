import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { SurfaceCard } from "@/components/dia-ui";
import type { DeveloperResearcher } from "@/features/developer/developer-content";
import { diamomTheme } from "@/theme";

type DeveloperResearcherCardProps = {
  researcher: DeveloperResearcher;
};

export function DeveloperResearcherCard({
  researcher,
}: DeveloperResearcherCardProps) {
  return (
    <SurfaceCard style={styles.card}>
      <View style={styles.photoFrame}>
        <Image
          accessibilityLabel={`Foto ${researcher.name}`}
          contentFit="cover"
          source={researcher.photo}
          style={styles.photo}
        />
      </View>

      <Text style={styles.name}>{researcher.name}</Text>

      <View
        style={[
          styles.rolePill,
          researcher.isChair ? styles.rolePillChair : styles.rolePillDefault,
        ]}
      >
        <Text
          style={[
            styles.roleText,
            researcher.isChair ? styles.roleTextChair : styles.roleTextDefault,
          ]}
        >
          {researcher.roleLabel}
        </Text>
      </View>

      <Text style={styles.nidn}>NIDN: {researcher.nidn}</Text>

      <View style={styles.institutionBlock}>
        <Text style={styles.institutionName}>{researcher.institution}</Text>
        <View style={styles.institutionLogoFrame}>
          <Image
            accessibilityLabel={`Logo ${researcher.institution}`}
            contentFit="contain"
            source={researcher.institutionLogo}
            style={styles.institutionLogo}
          />
        </View>
      </View>
    </SurfaceCard>
  );
}

const PHOTO_SIZE = 116;
const INSTITUTION_LOGO_SIZE = 64;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    gap: diamomTheme.spacing.sm,
    paddingVertical: diamomTheme.spacing.lg,
  },
  photoFrame: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.pill,
    borderWidth: 2,
    height: PHOTO_SIZE,
    overflow: "hidden",
    width: PHOTO_SIZE,
  },
  photo: {
    height: "100%",
    width: "100%",
  },
  name: {
    color: diamomTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 26,
    textAlign: "center",
  },
  rolePill: {
    borderRadius: diamomTheme.radius.pill,
    paddingHorizontal: diamomTheme.spacing.md,
    paddingVertical: diamomTheme.spacing.sm,
  },
  rolePillChair: {
    backgroundColor: diamomTheme.colors.primary,
  },
  rolePillDefault: {
    backgroundColor: diamomTheme.colors.primaryMuted,
  },
  roleText: {
    fontSize: 13,
    fontWeight: "700",
  },
  roleTextChair: {
    color: diamomTheme.colors.onPrimary,
  },
  roleTextDefault: {
    color: diamomTheme.colors.primaryStrong,
  },
  nidn: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  institutionBlock: {
    alignItems: "center",
    gap: diamomTheme.spacing.sm,
    marginTop: diamomTheme.spacing.xs,
    paddingHorizontal: diamomTheme.spacing.sm,
    width: "100%",
  },
  institutionLogoFrame: {
    alignItems: "center",
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.sm,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: diamomTheme.spacing.xxl,
  },
  institutionLogo: {
    height: INSTITUTION_LOGO_SIZE,
    width: INSTITUTION_LOGO_SIZE,
  },
  institutionName: {
    color: diamomTheme.colors.text,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
  },
});
