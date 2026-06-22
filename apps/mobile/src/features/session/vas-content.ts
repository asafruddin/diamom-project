import type { ImageSource } from "expo-image";

export type VasIllustrationKey = keyof typeof VAS_ILLUSTRATIONS;

export const VAS_ILLUSTRATIONS: Record<
  "before" | "after" | "laborDanceSession",
  ImageSource
> = {
  before: require("@/assets/icon/vas/vas-1.png"),
  after: require("@/assets/icon/vas/vas-2.png"),
  laborDanceSession: require("@/assets/material/pelaksanaan-labor-dance.png"),
} as const;

export const VAS_LEGEND = [
  { label: "Tidak Nyeri", range: "0" },
  { label: "Nyeri Ringan", range: "1-3" },
  { label: "Nyeri Sedang", range: "4-6" },
  { label: "Nyeri Berat", range: "7-10" },
] as const;
