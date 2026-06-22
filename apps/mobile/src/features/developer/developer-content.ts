import type { ImageSource } from "expo-image";

export type DeveloperResearcher = {
  id: string;
  name: string;
  roleLabel: string;
  isChair: boolean;
  nidn: string;
  institution: string;
  photo: ImageSource;
  institutionLogo: ImageSource;
};

export const DEVELOPER_INFO_COPY = {
  eyebrow: "Tim Peneliti",
  title: "Info Pengembang",
  description: "Peneliti yang mengembangkan aplikasi DiaMom.",
} as const;

export const DEVELOPER_RESEARCHERS: DeveloperResearcher[] = [
  {
    id: "peneliti-1",
    name: "Dian Pratiwi, S.S.T., M.Keb",
    roleLabel: "Peneliti 1 | Ketua",
    isChair: true,
    nidn: "4004059101",
    institution: "Poltekkes Kemenkes Manado",
    photo: require("@/assets/developer/dian_pratiwi.png"),
    institutionLogo: require("@/assets/developer/instansi/logo_pk_manado.png"),
  },
  {
    id: "peneliti-2",
    name: "Elisabeth Machdalena Feybe L., SKM, M.Kes",
    roleLabel: "Peneliti 2",
    isChair: false,
    nidn: "0931088001",
    institution: "Poltekkes Kemenkes Manado",
    photo: require("@/assets/developer/elisabeth_machdalena.jpg"),
    institutionLogo: require("@/assets/developer/instansi/logo_pk_manado.png"),
  },
  {
    id: "peneliti-3",
    name: "Bdn. Selasih Putri IH, S.Tr.Keb., M.Tr.Keb",
    roleLabel: "Peneliti 3",
    isChair: false,
    nidn: "0523039202",
    institution: "STIKES Guna Bangsa Yogyakarta",
    photo: require("@/assets/developer/selasih_putri.jpeg"),
    institutionLogo: require("@/assets/developer/instansi/logo_gby.png"),
  },
  {
    id: "peneliti-4",
    name: "Septi Indah Permata Sari, M.Keb",
    roleLabel: "Peneliti 4",
    isChair: false,
    nidn: "4007099201",
    institution: "Poltekkes Kemenkes Riau",
    photo: require("@/assets/developer/septi_indah.jpeg"),
    institutionLogo: require("@/assets/developer/instansi/logo_pk_riau.png"),
  },
];
