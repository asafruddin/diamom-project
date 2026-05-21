import { router } from "expo-router";

import {
    ActionButton,
    DiaScreen,
    IllustrationPanel,
    PageHeader,
    SurfaceCard,
} from "@/components/dia-ui";

export default function OnboardingIntroScreen() {
  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Onboarding"
        title="Selamat datang di DiaMom"
        description="Pelajari persiapan persalinan melalui latihan napas, panduan gerak Labor Dance, dan pemantauan kenyamanan diri."
      />

      <IllustrationPanel
        badge="01"
        title="DiaMom hadir sebagai pendamping edukasi, bukan pengganti tenaga medis."
        detail="Selesaikan persetujuan medis dan skrining keamanan sebelum menggunakan fitur latihan."
      />

      <SurfaceCard>
        <ActionButton
          accessibilityLabel="Lanjutkan ke persetujuan medis"
          label="Lanjutkan"
          onPress={() => router.push("/onboarding/consent")}
        />
      </SurfaceCard>
    </DiaScreen>
  );
}
