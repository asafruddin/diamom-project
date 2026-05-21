export type MaterialHref =
  | "/(tabs)/materials/labor-dance"
  | "/(tabs)/materials/sop"
  | "/(tabs)/materials/breathing"
  | "/(tabs)/materials/movements"
  | "/(tabs)/materials/closing";

export type MaterialItem = {
  id: string;
  step: string;
  title: string;
  description: string;
  href: MaterialHref;
};

export type SopStep = {
  id: string;
  step: string;
  title: string;
  description: string;
};

export type BreathingExercise = {
  id: string;
  title: string;
  rhythm: string;
  description: string;
};

export type LaborDanceMovement = {
  slug: string;
  title: string;
  summary: string;
  benefits: string[];
  steps: string[];
  caution: string;
};

export const HOME_SHORTCUTS = [
  {
    id: "materials",
    step: "01",
    title: "Daftar Materi",
    description:
      "Pelajari materi persiapan persalinan untuk latihan yang lebih nyaman.",
    href: "/(tabs)/materials" as const,
  },
  {
    id: "vas",
    step: "02",
    title: "Penilaian Nyeri (VAS)",
    description: "Catat kenyamanan Anda sebelum dan sesudah sesi Labor Dance.",
    href: "/(tabs)/vas" as const,
  },
  {
    id: "about",
    step: "03",
    title: "Info Pengembang",
    description:
      "Lihat ringkasan produk, batas penggunaan, dan pengaturan sederhana.",
    href: "/(tabs)/profile" as const,
  },
  {
    id: "details",
    step: "04",
    title: "Rincian Lainnya",
    description:
      "Buka ketentuan, reset onboarding, dan baca posisi DiaMom secara utuh.",
    href: "/(tabs)/profile" as const,
  },
] as const;

export const MATERIAL_ITEMS: MaterialItem[] = [
  {
    id: "labor-dance",
    step: "1",
    title: "Penjelasan Labor Dance",
    description:
      "Kenali manfaat gerak ritmis dan napas terarah untuk persiapan persalinan.",
    href: "/(tabs)/materials/labor-dance",
  },
  {
    id: "sop",
    step: "2",
    title: "SOP Labor Dance",
    description:
      "Lihat urutan singkat persiapan, pelaksanaan, evaluasi, dan dokumentasi.",
    href: "/(tabs)/materials/sop",
  },
  {
    id: "breathing",
    step: "3",
    title: "Gerakan Pernapasan",
    description:
      "Pelajari pola napas yang membantu tubuh tetap rileks saat kontraksi.",
    href: "/(tabs)/materials/breathing",
  },
  {
    id: "movements",
    step: "4",
    title: "Gerakan Labor Dance",
    description:
      "Pilih gerakan yang ingin Anda pelajari dan lakukan dengan ritme yang nyaman.",
    href: "/(tabs)/materials/movements",
  },
  {
    id: "closing",
    step: "5",
    title: "Penutup",
    description:
      "Akhiri sesi dengan afirmasi lembut dan pengingat untuk tetap tenang.",
    href: "/(tabs)/materials/closing",
  },
];

export const LABOR_DANCE_OVERVIEW = {
  title: "Penjelasan Labor Dance",
  body: "Labor Dance adalah gerakan tubuh lembut yang dipadukan dengan pola napas terarah untuk membantu ibu merasa lebih tenang, rileks, dan siap menghadapi persalinan.",
  benefits: [
    "Mengurangi rasa tegang pada pinggang dan panggul.",
    "Membantu tubuh tetap aktif dengan ritme yang nyaman.",
    "Meningkatkan fokus pada napas dan ketenangan diri.",
  ],
};

export const SOP_STEPS: SopStep[] = [
  {
    id: "preparation",
    step: "1",
    title: "Persiapan",
    description:
      "Pastikan kondisi aman, siapkan air minum, dan pilih ruang yang cukup untuk bergerak.",
  },
  {
    id: "explanation",
    step: "2",
    title: "Penjelasan",
    description:
      "Pahami tujuan sesi dan gerakan utama yang akan dilakukan sebelum mulai.",
  },
  {
    id: "activity",
    step: "3",
    title: "Pelaksanaan",
    description:
      "Lakukan rangkaian gerakan Labor Dance selama durasi yang dipilih dengan tempo lembut.",
  },
  {
    id: "evaluation",
    step: "4",
    title: "Evaluasi",
    description:
      "Nilai kenyamanan tubuh dengan VAS setelah sesi untuk pemantauan mandiri.",
  },
  {
    id: "documentation",
    step: "5",
    title: "Dokumentasi",
    description:
      "Catat hasil sesi sebagai bahan refleksi, bukan sebagai bukti medis.",
  },
];

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    id: "deep-breath",
    title: "Napas Dalam",
    rhythm: "Tarik 4 - tahan 2 - hembuskan 6",
    description:
      "Digunakan untuk menenangkan tubuh ketika mulai merasa tegang atau lelah.",
  },
  {
    id: "long-breath",
    title: "Napas Panjang",
    rhythm: "Tarik 5 - hembuskan 7",
    description: "Cocok saat ingin menjaga napas tetap stabil dan panjang.",
  },
  {
    id: "short-breath",
    title: "Napas Pendek",
    rhythm: "Tarik 2 - hembuskan 2",
    description: "Membantu menjaga ritme saat kontraksi terasa lebih intens.",
  },
];

export const LABOR_DANCE_MOVEMENTS: LaborDanceMovement[] = [
  {
    slug: "goyang-pinggul",
    title: "Goyang Pinggul",
    summary:
      "Gerakan lembut ke kanan dan kiri untuk membantu area panggul terasa lebih ringan.",
    benefits: [
      "Membantu relaksasi otot panggul.",
      "Membantu tubuh menemukan ritme napas yang stabil.",
      "Menurunkan rasa kaku pada pinggang bawah.",
    ],
    steps: [
      "Berdiri dengan kaki selebar bahu.",
      "Letakkan tangan di pinggul untuk membantu menjaga keseimbangan.",
      "Goyangkan pinggul ke kanan dan ke kiri secara perlahan sambil menjaga napas tetap teratur.",
    ],
    caution:
      "Hentikan jika muncul pusing, nyeri hebat, sesak napas, perdarahan, atau rasa tidak nyaman yang meningkat.",
  },
  {
    slug: "gerakan-melingkar",
    title: "Gerakan Melingkar",
    summary:
      "Gerakan memutar panggul untuk membantu tubuh tetap rileks dan aktif.",
    benefits: [
      "Membantu mobilitas panggul.",
      "Memberi rasa nyaman pada punggung bagian bawah.",
    ],
    steps: [
      "Berdiri tegak dengan lutut sedikit rileks.",
      "Putar panggul membentuk lingkaran kecil searah jarum jam.",
      "Ulangi ke arah berlawanan sambil tetap menjaga napas tenang.",
    ],
    caution:
      "Jaga gerakan tetap kecil dan lembut. Hentikan bila tubuh terasa tidak stabil.",
  },
  {
    slug: "jongkok",
    title: "Jongkok (Squat)",
    summary:
      "Gerakan menurunkan tubuh secara perlahan untuk membantu kelenturan panggul.",
    benefits: [
      "Membantu membuka panggul secara bertahap.",
      "Melatih keseimbangan tubuh bagian bawah.",
    ],
    steps: [
      "Berdiri dengan kedua kaki lebih lebar dari bahu.",
      "Turunkan tubuh perlahan seperti posisi jongkok setengah.",
      "Naik kembali sambil menjaga punggung tetap nyaman.",
    ],
    caution:
      "Gunakan pendamping atau pegangan bila perlu. Hindari menahan napas saat bergerak.",
  },
  {
    slug: "condong-ke-depan",
    title: "Condong ke Depan",
    summary:
      "Gerakan ringan dengan tubuh condong ke depan untuk memberi ruang pada punggung bawah.",
    benefits: [
      "Membantu mengurangi ketegangan pinggang.",
      "Mendukung posisi tubuh yang lebih santai.",
    ],
    steps: [
      "Berdiri di depan meja atau sandaran yang kokoh.",
      "Condongkan tubuh sedikit ke depan sambil menopang tangan.",
      "Tarik napas perlahan dan hembuskan sambil melemaskan bahu.",
    ],
    caution: "Gunakan permukaan yang stabil dan hentikan bila terasa pusing.",
  },
  {
    slug: "gerakan-kupu-kupu",
    title: "Gerakan Kupu-Kupu",
    summary:
      "Gerakan duduk dengan kaki rapat ke dalam untuk membantu tubuh lebih rileks.",
    benefits: [
      "Membantu relaksasi area panggul.",
      "Memberi jeda lembut di tengah sesi aktif.",
    ],
    steps: [
      "Duduk di alas yang nyaman.",
      "Satukan telapak kaki dan biarkan lutut turun perlahan.",
      "Ayunkan lutut naik turun dengan gerak yang lembut.",
    ],
    caution:
      "Berhenti bila ada rasa tertarik berlebihan atau tidak nyaman pada pinggul.",
  },
  {
    slug: "berdiri-relaksasi",
    title: "Berdiri & Relaksasi",
    summary:
      "Gerakan penutup untuk menenangkan tubuh setelah melakukan rangkaian latihan.",
    benefits: [
      "Membantu menurunkan intensitas aktivitas secara perlahan.",
      "Memberi ruang untuk kembali fokus pada napas.",
    ],
    steps: [
      "Berdiri tegak dengan bahu rileks.",
      "Tarik napas dalam sambil mengangkat bahu sedikit.",
      "Hembuskan napas perlahan sambil menurunkan bahu dan melepas ketegangan.",
    ],
    caution:
      "Pastikan tubuh stabil dan hentikan bila ada rasa melayang atau lemah.",
  },
];

export function getMovementBySlug(
  slug: string | string[] | undefined,
): LaborDanceMovement | undefined {
  const value = Array.isArray(slug) ? slug[0] : slug;
  return LABOR_DANCE_MOVEMENTS.find((movement) => movement.slug === value);
}
