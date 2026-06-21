import type Ionicons from "@expo/vector-icons/Ionicons";

export type MaterialHref =
  | "/(tabs)/materials/labor-dance"
  | "/(tabs)/materials/sop"
  | "/(tabs)/materials/breathing"
  | "/(tabs)/materials/movements"
  | "/(tabs)/materials/closing";

export type MaterialId =
  | "labor-dance"
  | "sop"
  | "breathing"
  | "movements"
  | "closing";

export type MaterialIconName = keyof typeof Ionicons.glyphMap;

export type MaterialTone = "calm" | "support" | "safety";

export type MaterialItem = {
  id: MaterialId;
  step: string;
  title: string;
  description: string;
  href: MaterialHref;
  iconName: MaterialIconName;
  readTime: string;
};

export type MaterialSection = {
  id: string;
  title: string;
  body?: string;
  bullets?: string[];
  iconName: MaterialIconName;
  tone?: MaterialTone;
};

export type MaterialMovementGroup = {
  id: "warmup" | "main" | "cooldown";
  step: string;
  title: string;
  description: string;
  steps: string[];
};

export type MaterialNavigationItem = {
  href: MaterialHref;
  title: string;
};

export type MaterialDetail = {
  id: MaterialId;
  eyebrow: string;
  title: string;
  description: string;
  readTime: string;
  heroIconName: MaterialIconName;
  heroTitle: string;
  heroDetail: string;
  sections: MaterialSection[];
  safetyNotes: string[];
  movementGroups?: MaterialMovementGroup[];
};

export type SopStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  bullets: string[];
};

export type BreathingExercise = {
  id: string;
  title: string;
  rhythm: string;
  purpose: string;
  preparation: string;
  steps: string[];
  safetyNotes: string[];
};

export type LaborDanceMovement = {
  slug: string;
  title: string;
  summary: string;
  difficulty: "Lembut" | "Sedang";
  equipment: string;
  companion: string;
  preparation: string[];
  benefits: string[];
  steps: string[];
  whenToStop: string[];
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
      "Kenali konsep, tujuan, manfaat kenyamanan, dan batas aman Labor Dance.",
    href: "/(tabs)/materials/labor-dance",
    iconName: "body",
    readTime: "5 menit",
  },
  {
    id: "sop",
    step: "2",
    title: "SOP Labor Dance",
    description:
      "Ikuti alur persiapan, penjelasan, pelaksanaan, evaluasi, dan dokumentasi.",
    href: "/(tabs)/materials/sop",
    iconName: "clipboard",
    readTime: "4 menit",
  },
  {
    id: "breathing",
    step: "3",
    title: "Gerakan Pernapasan",
    description:
      "Pilih pola napas yang lembut untuk membantu tubuh tetap tenang.",
    href: "/(tabs)/materials/breathing",
    iconName: "leaf",
    readTime: "3 menit",
  },
  {
    id: "movements",
    step: "4",
    title: "Gerakan Labor Dance",
    description:
      "Pelajari gerakan, alat bantu, kebutuhan pendamping, dan kapan perlu berhenti.",
    href: "/(tabs)/materials/movements",
    iconName: "walk",
    readTime: "6 menit",
  },
  {
    id: "closing",
    step: "5",
    title: "Penutup",
    description:
      "Akhiri sesi belajar dengan afirmasi lembut dan pengingat batas aman.",
    href: "/(tabs)/materials/closing",
    iconName: "heart",
    readTime: "2 menit",
  },
];

export const LABOR_DANCE_DETAIL: MaterialDetail = {
  id: "labor-dance",
  eyebrow: "Materi 1",
  title: "Penjelasan Labor Dance",
  description:
    "Pahami Labor Dance sebagai edukasi gerak lembut dengan napas, posisi tegak, dan dukungan pendamping.",
  readTime: "5 menit",
  heroIconName: "body",
  heroTitle: "Gerak lembut, napas tenang, dan dukungan yang membuat ibu merasa lebih siap.",
  heroDetail:
    "Materi ini bersifat edukasi. Ikuti arahan dokter, bidan, atau tenaga kesehatan sebelum mencoba gerakan.",
  sections: [
    {
      id: "definition",
      title: "Pengertian",
      iconName: "sparkles",
      body: "Labor Dance adalah rangkaian gerak panggul, perubahan posisi, posisi tegak, napas terarah, dan dukungan pendamping. Di DiaMom, materi ini dipakai sebagai edukasi persiapan dan dukungan kenyamanan, bukan pengganti pemeriksaan atau arahan klinis.",
      tone: "calm",
    },
    {
      id: "philosophy",
      title: "Filosofi & tujuan",
      iconName: "compass",
      body: "Saat tubuh diberi ruang bergerak dengan lembut, ibu dapat lebih mudah menemukan ritme napas dan posisi yang terasa nyaman. Tujuannya adalah membantu ibu belajar mengenali tubuh, menerima dukungan emosional, dan mempersiapkan diri dengan lebih tenang.",
      tone: "support",
    },
    {
      id: "comfort-benefits",
      title: "Manfaat untuk kenyamanan ibu",
      iconName: "happy",
      bullets: [
        "Membantu tubuh merasa lebih rileks melalui gerak perlahan.",
        "Mendukung fokus pada napas saat tubuh terasa tegang.",
        "Memberi ruang dukungan fisik dan emosional dari pendamping.",
        "Membantu ibu mengenali gerakan yang terasa nyaman untuk tubuhnya.",
      ],
      tone: "support",
    },
    {
      id: "provider-guidance",
      title: "Kapan perlu arahan tenaga kesehatan",
      iconName: "medkit",
      body: "Diskusikan rencana Labor Dance dengan dokter, bidan, atau tenaga kesehatan, terutama bila sedang dalam proses persalinan, memiliki riwayat kehamilan berisiko, atau pernah diminta membatasi gerak.",
      tone: "safety",
    },
    {
      id: "mechanism",
      title: "Mekanisme pelaksanaan",
      iconName: "repeat",
      bullets: [
        "Sesuaikan gerakan dengan kondisi dan kemampuan ibu.",
        "Siapkan ruang aman, air minum, alas yang nyaman, dan pendamping bila diperlukan.",
        "Jaga gerakan tetap perlahan; tidak perlu mengejar durasi atau jumlah gerakan.",
        "Beristirahat bila lelah, kontraksi terasa kuat, atau tubuh meminta jeda.",
      ],
      tone: "calm",
    },
  ],
  safetyNotes: [
    "Jangan lanjutkan bila muncul perdarahan, pusing berat, sesak napas, nyeri dada, atau nyeri hebat yang tidak biasa.",
    "Hentikan gerakan bila tubuh terasa tidak stabil, sangat lelah, atau tidak nyaman.",
    "Ikuti arahan dokter, bidan, atau tenaga kesehatan. Arahan profesional selalu lebih utama daripada materi aplikasi.",
  ],
  movementGroups: [
    {
      id: "warmup",
      step: "01",
      title: "Pemanasan",
      description:
        "Mempersiapkan tubuh dan pikiran dengan napas, relaksasi wajah, bahu, leher, lutut, dan panggul.",
      steps: [
        "Berdiri di ruang yang aman dengan pendamping di depan bila diperlukan.",
        "Letakkan tangan pada bahu atau lengan pendamping untuk menjaga keseimbangan.",
        "Tarik napas perlahan, hembuskan lewat mulut, lalu rilekskan wajah, rahang, bahu, dan leher.",
        "Gerakkan kepala, lutut, dan pinggul secara kecil dan perlahan.",
      ],
    },
    {
      id: "main",
      step: "02",
      title: "Gerakan inti",
      description:
        "Melatih orientasi panggul dan gerak ritmis dengan bantuan pendamping atau pegangan stabil.",
      steps: [
        "Melangkah pelan ke depan dan kembali ke posisi awal sambil menjaga napas.",
        "Lakukan hip sway dengan menggoyangkan panggul kanan-kiri secara lembut.",
        "Gerakkan panggul maju-mundur dan melingkar dengan lutut sedikit rileks.",
        "Bila nyaman, coba pola angka delapan dengan gerak kecil dan terkontrol.",
      ],
    },
    {
      id: "cooldown",
      step: "03",
      title: "Pendinginan",
      description:
        "Mengembalikan ritme napas dan membantu otot kembali rileks setelah belajar gerak.",
      steps: [
        "Perlambat langkah dan kembali pada napas panjang.",
        "Ulangi hip sway kecil dengan tempo yang lebih tenang.",
        "Rilekskan bahu, pinggang, dan kaki sebelum duduk atau beristirahat.",
      ],
    },
  ],
};

export const SOP_DETAIL: MaterialDetail = {
  id: "sop",
  eyebrow: "Materi 2",
  title: "SOP Labor Dance",
  description:
    "Gunakan alur ini sebagai panduan edukasi agar sesi belajar tetap terarah dan aman.",
  readTime: "4 menit",
  heroIconName: "clipboard",
  heroTitle: "SOP dibuat singkat agar ibu dan pendamping mudah mengikuti alur belajar.",
  heroDetail:
    "SOP ini tidak menggantikan arahan tenaga kesehatan dan perlu disesuaikan dengan kondisi ibu.",
  sections: [
    {
      id: "overview",
      title: "Cara memakai SOP",
      iconName: "list",
      body: "Baca tiap tahap secara berurutan. Bila ada kondisi yang membuat ibu ragu, hentikan rencana latihan dan konsultasikan dengan dokter atau bidan.",
      tone: "calm",
    },
  ],
  safetyNotes: [
    "Pastikan ibu merasa aman, tidak pusing, tidak sesak napas, dan berada di ruang yang cukup untuk bergerak.",
    "Sediakan air minum dan pendamping bila gerakan membutuhkan bantuan keseimbangan.",
    "Hentikan sesi bila muncul rasa tidak nyaman atau tanda bahaya.",
  ],
};

export const BREATHING_DETAIL: MaterialDetail = {
  id: "breathing",
  eyebrow: "Materi 3",
  title: "Gerakan Pernapasan",
  description:
    "Pelajari pola napas lembut untuk membantu tubuh kembali tenang sebelum atau saat belajar gerak.",
  readTime: "3 menit",
  heroIconName: "leaf",
  heroTitle: "Napas yang pelan memberi tubuh kesempatan untuk melambat.",
  heroDetail:
    "Pilih ritme yang terasa nyaman. Tidak perlu memaksakan hitungan bila tubuh meminta jeda.",
  sections: [
    {
      id: "purpose",
      title: "Tujuan napas",
      iconName: "heart-circle",
      body: "Latihan napas membantu ibu mengenali ritme tubuh dan memberi jeda saat merasa tegang. Latihan ini bersifat dukungan kenyamanan, bukan terapi medis.",
      tone: "support",
    },
  ],
  safetyNotes: [
    "Berhenti bila muncul pusing, sesak, nyeri dada, atau rasa tidak nyaman.",
    "Bernapaslah tanpa menahan napas terlalu lama.",
    "Gunakan posisi duduk atau berdiri yang stabil.",
  ],
};

export const MOVEMENTS_DETAIL: MaterialDetail = {
  id: "movements",
  eyebrow: "Materi 4",
  title: "Gerakan Labor Dance",
  description:
    "Pilih gerakan yang ingin dipelajari, lalu baca alat bantu, pendamping, dan tanda berhenti.",
  readTime: "6 menit",
  heroIconName: "walk",
  heroTitle: "Setiap gerakan boleh dibuat lebih kecil, lebih lambat, atau dihentikan.",
  heroDetail:
    "Utamakan rasa aman. Bila tubuh memberi sinyal tidak nyaman, berhenti dan cari dukungan.",
  sections: [
    {
      id: "before-moving",
      title: "Sebelum memilih gerakan",
      iconName: "shield-checkmark",
      bullets: [
        "Gunakan pakaian yang nyaman dan alas kaki yang tidak licin.",
        "Siapkan pegangan stabil atau pendamping bila keseimbangan terasa kurang mantap.",
        "Pilih gerakan lembut terlebih dahulu dan perhatikan respons tubuh.",
      ],
      tone: "safety",
    },
  ],
  safetyNotes: [
    "Jangan lanjutkan bila muncul perdarahan, pusing berat, sesak napas, nyeri dada, atau nyeri hebat.",
    "Hentikan bila gerakan membuat tubuh tidak stabil atau tidak nyaman.",
    "Konsultasikan dengan dokter atau bidan bila pernah diminta membatasi gerak.",
  ],
};

export const CLOSING_DETAIL: MaterialDetail = {
  id: "closing",
  eyebrow: "Materi 5",
  title: "Penutup",
  description:
    "Akhiri sesi belajar dengan tenang, dukungan lembut, dan pengingat untuk mengikuti arahan tenaga kesehatan.",
  readTime: "2 menit",
  heroIconName: "heart",
  heroTitle: "Anda sudah memberi waktu untuk memahami tubuh dengan lebih lembut.",
  heroDetail:
    "Ambil napas pelan, minum air bila perlu, dan lanjutkan hanya saat tubuh terasa aman.",
  sections: [
    {
      id: "affirmation",
      title: "Afirmasi lembut",
      iconName: "flower",
      body: "Ibu hebat. Setiap langkah kecil untuk belajar, bernapas, dan mengenali tubuh adalah bagian dari persiapan yang penuh perhatian.",
      tone: "support",
    },
    {
      id: "boundary",
      title: "Pengingat batas aman",
      iconName: "shield",
      body: "DiaMom adalah teman belajar dan dukungan. Untuk keputusan tentang kondisi kehamilan, persalinan, atau keluhan tubuh, selalu ikuti arahan dokter, bidan, atau tenaga kesehatan.",
      tone: "safety",
    },
  ],
  safetyNotes: [
    "Berhenti kapan saja bila merasa tidak aman atau tidak nyaman.",
    "Hubungi dokter, bidan, atau pendamping bila gejala mengganggu atau berlanjut.",
  ],
};

export const MATERIAL_DETAILS: MaterialDetail[] = [
  LABOR_DANCE_DETAIL,
  SOP_DETAIL,
  BREATHING_DETAIL,
  MOVEMENTS_DETAIL,
  CLOSING_DETAIL,
];

export const SOP_STEPS: SopStep[] = [
  {
    id: "preparation",
    step: "1",
    title: "Persiapan",
    description:
      "Pastikan kondisi aman, ruang cukup, tubuh stabil, dan ibu memahami bahwa aktivitas bisa dihentikan kapan saja.",
    bullets: [
      "Siapkan air minum dan alas yang nyaman.",
      "Gunakan pendamping bila gerakan membutuhkan bantuan.",
      "Tunda latihan bila ada tanda tidak nyaman.",
    ],
  },
  {
    id: "explanation",
    step: "2",
    title: "Penjelasan",
    description:
      "Pahami tujuan gerakan, batas aman, dan tanda berhenti sebelum memulai.",
    bullets: [
      "Baca manfaat sebagai dukungan kenyamanan, bukan janji hasil medis.",
      "Pilih gerakan yang paling mudah dipahami terlebih dahulu.",
    ],
  },
  {
    id: "activity",
    step: "3",
    title: "Pelaksanaan",
    description:
      "Lakukan gerakan dengan tempo lembut, durasi singkat, dan jeda sesuai kebutuhan tubuh.",
    bullets: [
      "Jaga napas tetap pelan.",
      "Kurangi rentang gerak bila terasa terlalu berat.",
      "Berhenti bila muncul rasa tidak aman.",
    ],
  },
  {
    id: "evaluation",
    step: "4",
    title: "Evaluasi",
    description:
      "Perhatikan kenyamanan tubuh setelah belajar gerak dan gunakan VAS hanya untuk pemantauan mandiri.",
    bullets: [
      "Catat rasa nyaman atau tidak nyaman secara jujur.",
      "Jangan memakai catatan VAS sebagai bukti hasil medis.",
    ],
  },
  {
    id: "documentation",
    step: "5",
    title: "Dokumentasi",
    description:
      "Simpan ringkasan sesi sebagai bahan refleksi pribadi dan tetap ikuti arahan tenaga kesehatan.",
    bullets: [
      "Catatan tersimpan di database DiaMom.",
      "Tidak perlu mencatat informasi pribadi yang tidak dibutuhkan.",
    ],
  },
];

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    id: "deep-breath",
    title: "Napas Dalam",
    rhythm: "Tarik 4 - tahan 2 - hembuskan 6",
    purpose:
      "Membantu tubuh melambat saat ibu mulai merasa tegang atau lelah.",
    preparation: "Duduk atau berdiri stabil, bahu rileks, dan pandangan lembut.",
    steps: [
      "Tarik napas perlahan lewat hidung.",
      "Tahan sebentar tanpa memaksa.",
      "Hembuskan lebih panjang lewat mulut.",
    ],
    safetyNotes: ["Lewati hitungan tahan napas bila membuat pusing."],
  },
  {
    id: "long-breath",
    title: "Napas Panjang",
    rhythm: "Tarik 5 - hembuskan 7",
    purpose: "Cocok saat ibu ingin menjaga ritme napas tetap stabil.",
    preparation: "Letakkan satu tangan di dada atau perut bila terasa membantu.",
    steps: [
      "Tarik napas dengan hitungan yang nyaman.",
      "Hembuskan perlahan lebih panjang dari tarikan.",
      "Ulangi beberapa kali, lalu berhenti bila tubuh meminta jeda.",
    ],
    safetyNotes: ["Tidak perlu mengejar hitungan bila napas terasa berat."],
  },
  {
    id: "short-breath",
    title: "Napas Pendek",
    rhythm: "Tarik 2 - hembuskan 2",
    purpose:
      "Memberi ritme sederhana saat ibu membutuhkan napas yang ringan dan mudah diikuti.",
    preparation: "Pastikan leher dan bahu tidak tegang.",
    steps: [
      "Tarik napas pendek dengan lembut.",
      "Hembuskan napas pendek tanpa menekan dada.",
      "Kembali ke napas biasa saat tubuh mulai tenang.",
    ],
    safetyNotes: ["Berhenti bila napas terasa makin cepat atau tidak nyaman."],
  },
  {
    id: "relax-breath",
    title: "Napas Relaksasi",
    rhythm: "Tarik pelan - hembuskan sambil melepas bahu",
    purpose:
      "Membantu mengawali atau menutup sesi belajar dengan rasa lebih tenang.",
    preparation: "Pilih posisi duduk atau berdiri yang paling aman.",
    steps: [
      "Tarik napas sambil merasakan bahu tetap rileks.",
      "Hembuskan napas sambil melembutkan wajah, rahang, dan tangan.",
      "Ulangi dengan tempo yang terasa alami.",
    ],
    safetyNotes: ["Berhenti bila muncul pusing, sesak, atau nyeri dada."],
  },
];

export const LABOR_DANCE_MOVEMENTS: LaborDanceMovement[] = [
  {
    slug: "goyang-pinggul",
    title: "Goyang Pinggul",
    summary:
      "Gerakan lembut ke kanan dan kiri untuk membantu area panggul terasa lebih ringan.",
    difficulty: "Lembut",
    equipment: "Ruang aman atau pegangan stabil",
    companion: "Disarankan bila keseimbangan belum mantap",
    preparation: [
      "Berdiri dengan kaki selebar pinggul.",
      "Gunakan pegangan atau pendamping bila perlu.",
    ],
    benefits: [
      "Membantu relaksasi otot panggul.",
      "Membantu tubuh menemukan ritme napas yang stabil.",
      "Memberi jeda lembut pada pinggang bawah.",
    ],
    steps: [
      "Berdiri dengan kaki selebar bahu.",
      "Letakkan tangan di pinggul, pegangan, atau lengan pendamping.",
      "Goyangkan pinggul ke kanan dan kiri secara perlahan sambil menjaga napas tetap teratur.",
    ],
    whenToStop: [
      "Pusing, lemah, atau tubuh terasa tidak stabil.",
      "Nyeri hebat, sesak napas, perdarahan, atau rasa tidak nyaman yang meningkat.",
    ],
    caution:
      "Jaga gerakan tetap kecil dan nyaman. Hentikan bila tubuh memberi sinyal tidak aman.",
  },
  {
    slug: "gerakan-melingkar",
    title: "Gerakan Melingkar",
    summary:
      "Gerakan memutar panggul untuk membantu tubuh tetap rileks dan aktif secara lembut.",
    difficulty: "Lembut",
    equipment: "Ruang aman, pegangan stabil",
    companion: "Opsional",
    preparation: [
      "Berdiri tegak dengan lutut sedikit rileks.",
      "Pastikan lantai tidak licin.",
    ],
    benefits: [
      "Membantu mobilitas panggul secara perlahan.",
      "Memberi rasa lebih santai pada punggung bagian bawah.",
    ],
    steps: [
      "Putar panggul membentuk lingkaran kecil searah jarum jam.",
      "Berhenti sejenak di tengah.",
      "Ulangi ke arah berlawanan sambil tetap menjaga napas tenang.",
    ],
    whenToStop: [
      "Gerakan membuat tubuh oleng.",
      "Perut, panggul, atau pinggang terasa tidak nyaman.",
    ],
    caution:
      "Jaga putaran tetap kecil. Pegang permukaan stabil bila tubuh terasa kurang seimbang.",
  },
  {
    slug: "jongkok",
    title: "Jongkok (Squat)",
    summary:
      "Gerakan menurunkan tubuh secara perlahan untuk melatih kelenturan panggul dengan bantuan bila perlu.",
    difficulty: "Sedang",
    equipment: "Pegangan stabil, kursi kokoh, atau pendamping",
    companion: "Disarankan",
    preparation: [
      "Berdiri dengan kaki lebih lebar dari bahu.",
      "Pegang kursi kokoh atau pendamping sebelum mulai.",
    ],
    benefits: [
      "Membantu membuka area panggul secara bertahap.",
      "Melatih keseimbangan tubuh bagian bawah.",
    ],
    steps: [
      "Turunkan tubuh perlahan seperti posisi jongkok setengah.",
      "Jaga punggung tetap nyaman dan napas tidak ditahan.",
      "Naik kembali pelan dengan bantuan pegangan bila perlu.",
    ],
    whenToStop: [
      "Lutut, pinggang, atau panggul terasa nyeri.",
      "Tubuh terasa lemah, pusing, atau sulit naik kembali.",
    ],
    caution:
      "Gunakan pendamping atau pegangan. Hindari menahan napas saat bergerak.",
  },
  {
    slug: "condong-ke-depan",
    title: "Condong ke Depan",
    summary:
      "Gerakan ringan dengan tubuh condong ke depan untuk memberi ruang istirahat pada punggung bawah.",
    difficulty: "Lembut",
    equipment: "Meja, kursi kokoh, atau sandaran stabil",
    companion: "Opsional",
    preparation: [
      "Berdiri di depan meja atau sandaran yang kokoh.",
      "Pastikan tangan dapat menopang tubuh dengan nyaman.",
    ],
    benefits: [
      "Membantu pinggang terasa lebih rileks.",
      "Mendukung posisi tubuh yang lebih santai.",
    ],
    steps: [
      "Condongkan tubuh sedikit ke depan sambil menopang tangan.",
      "Lembutkan bahu dan leher.",
      "Tarik napas perlahan dan hembuskan sambil melepaskan ketegangan.",
    ],
    whenToStop: [
      "Permukaan penopang terasa tidak stabil.",
      "Muncul pusing, nyeri dada, sesak, atau rasa tidak nyaman.",
    ],
    caution: "Gunakan permukaan yang stabil dan hentikan bila terasa pusing.",
  },
  {
    slug: "gerakan-kupu-kupu",
    title: "Gerakan Kupu-Kupu",
    summary:
      "Gerakan duduk dengan kaki rapat ke dalam untuk membantu tubuh lebih rileks.",
    difficulty: "Lembut",
    equipment: "Alas duduk nyaman",
    companion: "Opsional",
    preparation: [
      "Duduk di alas yang nyaman.",
      "Topang punggung bila tubuh membutuhkan sandaran.",
    ],
    benefits: [
      "Membantu relaksasi area panggul.",
      "Memberi jeda lembut di tengah sesi aktif.",
    ],
    steps: [
      "Satukan telapak kaki dan biarkan lutut turun perlahan.",
      "Ayunkan lutut naik turun dengan gerak kecil dan lembut.",
      "Kembali diam bila terasa tertarik berlebihan.",
    ],
    whenToStop: [
      "Pinggul atau paha terasa tertarik berlebihan.",
      "Posisi duduk membuat napas atau punggung tidak nyaman.",
    ],
    caution:
      "Berhenti bila ada rasa tertarik berlebihan atau tidak nyaman pada pinggul.",
  },
  {
    slug: "berdiri-relaksasi",
    title: "Berdiri & Relaksasi",
    summary:
      "Gerakan penutup untuk menenangkan tubuh setelah melakukan rangkaian latihan.",
    difficulty: "Lembut",
    equipment: "Ruang aman atau pegangan stabil",
    companion: "Opsional",
    preparation: [
      "Berdiri tegak dengan kaki nyaman.",
      "Pegang permukaan stabil bila perlu.",
    ],
    benefits: [
      "Membantu menurunkan intensitas aktivitas secara perlahan.",
      "Memberi ruang untuk kembali fokus pada napas.",
    ],
    steps: [
      "Berdiri tegak dengan bahu rileks.",
      "Tarik napas dalam sambil mengangkat bahu sedikit.",
      "Hembuskan napas perlahan sambil menurunkan bahu dan melepas ketegangan.",
    ],
    whenToStop: [
      "Tubuh terasa melayang atau lemah.",
      "Muncul rasa tidak nyaman yang membuat ibu ingin duduk atau beristirahat.",
    ],
    caution:
      "Pastikan tubuh stabil dan hentikan bila ada rasa melayang atau lemah.",
  },
];

export function getMaterialById(
  id: string | string[] | undefined,
): MaterialDetail | undefined {
  const value = Array.isArray(id) ? id[0] : id;
  return MATERIAL_DETAILS.find((material) => material.id === value);
}

export function getMaterialByHref(
  href: MaterialHref,
): MaterialDetail | undefined {
  const item = MATERIAL_ITEMS.find((material) => material.href === href);
  return getMaterialById(item?.id);
}

export function getMaterialNavigation(
  href: MaterialHref,
): {
  previous?: MaterialNavigationItem;
  next?: MaterialNavigationItem;
} {
  const index = MATERIAL_ITEMS.findIndex((material) => material.href === href);

  if (index === -1) {
    return {};
  }

  const previous = MATERIAL_ITEMS[index - 1];
  const next = MATERIAL_ITEMS[index + 1];

  return {
    previous: previous
      ? {
          href: previous.href,
          title: previous.title,
        }
      : undefined,
    next: next
      ? {
          href: next.href,
          title: next.title,
        }
      : undefined,
  };
}

export function getMovementBySlug(
  slug: string | string[] | undefined,
): LaborDanceMovement | undefined {
  const value = Array.isArray(slug) ? slug[0] : slug;
  return LABOR_DANCE_MOVEMENTS.find((movement) => movement.slug === value);
}
