import { StyleSheet, Text, View } from "react-native";

import { DiaScreen, PageHeader } from "@/components/dia-ui";
import { DeveloperResearcherCard } from "@/features/developer/developer-components";
import {
  DEVELOPER_INFO_COPY,
  DEVELOPER_RESEARCHERS,
} from "@/features/developer/developer-content";
import { diamomTheme } from "@/theme";

export default function DeveloperInfoScreen() {
  return (
    <DiaScreen>
      <PageHeader
        description={DEVELOPER_INFO_COPY.description}
        eyebrow={DEVELOPER_INFO_COPY.eyebrow}
        showBack
        title={DEVELOPER_INFO_COPY.title}
      />

      {DEVELOPER_RESEARCHERS.map((researcher) => (
        <DeveloperResearcherCard key={researcher.id} researcher={researcher} />
      ))}

      <View style={styles.footerBlock}>
        <Text style={styles.footerTagline}>
          {DEVELOPER_INFO_COPY.footerTagline}
        </Text>
        <Text style={styles.footerCredit}>
          {DEVELOPER_INFO_COPY.footerCredit}
        </Text>
      </View>
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  footerBlock: {
    gap: diamomTheme.spacing.sm,
    paddingTop: diamomTheme.spacing.sm,
  },
  footerTagline: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
  footerCredit: {
    color: diamomTheme.colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
});
