export type MotherIdentityFormValues = {
  age: string;
  dilationCm: number | null;
  gpa: string;
  motherName: string;
  pregnancyWeek: string;
};

export type ValidatedMotherIdentity = {
  age: number;
  dilationCm: number;
  gpa: string;
  motherName: string;
  pregnancyWeek: number;
};

export type PregnancyProgressFormValues = Pick<
  MotherIdentityFormValues,
  "dilationCm" | "pregnancyWeek"
>;

export type ValidatedPregnancyProgress = {
  dilationCm: number;
  pregnancyWeek: number;
};

export type MotherIdentityValidationResult =
  | {
      errors: Record<keyof MotherIdentityFormValues, string | undefined>;
      isValid: false;
    }
  | {
      errors: Record<keyof MotherIdentityFormValues, undefined>;
      isValid: true;
      value: ValidatedMotherIdentity;
    };

export type PregnancyProgressValidationResult =
  | {
      errors: Record<keyof PregnancyProgressFormValues, string | undefined>;
      isValid: false;
    }
  | {
      errors: Record<keyof PregnancyProgressFormValues, undefined>;
      isValid: true;
      value: ValidatedPregnancyProgress;
    };

const parseInteger = (value: string): number | null => {
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) {
    return null;
  }

  return Number.parseInt(trimmed, 10);
};

export function validatePregnancyProgress(
  values: PregnancyProgressFormValues,
): PregnancyProgressValidationResult {
  const errors: Record<
    keyof PregnancyProgressFormValues,
    string | undefined
  > = {
    dilationCm: undefined,
    pregnancyWeek: undefined,
  };
  const pregnancyWeek = parseInteger(values.pregnancyWeek);

  if (pregnancyWeek === null || pregnancyWeek < 1 || pregnancyWeek > 45) {
    errors.pregnancyWeek = "Usia kehamilan wajib diisi 1 sampai 45 minggu.";
  }

  if (values.dilationCm === null) {
    errors.dilationCm = "Pilih pembukaan 1 sampai 10 cm.";
  }

  const hasError = Object.values(errors).some(Boolean);
  if (hasError) {
    return { errors, isValid: false };
  }

  return {
    errors: {
      dilationCm: undefined,
      pregnancyWeek: undefined,
    },
    isValid: true,
    value: {
      dilationCm: values.dilationCm as number,
      pregnancyWeek: pregnancyWeek as number,
    },
  };
}

export function validateMotherIdentity(
  values: MotherIdentityFormValues,
): MotherIdentityValidationResult {
  const errors: Record<keyof MotherIdentityFormValues, string | undefined> = {
    age: undefined,
    dilationCm: undefined,
    gpa: undefined,
    motherName: undefined,
    pregnancyWeek: undefined,
  };

  const motherName = values.motherName.trim();
  const gpa = values.gpa.trim().toUpperCase();
  const age = parseInteger(values.age);
  const progressResult = validatePregnancyProgress({
    dilationCm: values.dilationCm,
    pregnancyWeek: values.pregnancyWeek,
  });

  if (motherName.length < 2) {
    errors.motherName = "Nama ibu wajib diisi minimal 2 huruf.";
  }

  if (age === null || age < 12 || age > 60) {
    errors.age = "Umur wajib diisi angka 12 sampai 60 tahun.";
  }

  if (gpa.length < 1) {
    errors.gpa = "GPA wajib diisi sesuai catatan bidan atau tenaga kesehatan.";
  }

  if (!progressResult.isValid) {
    errors.dilationCm = progressResult.errors.dilationCm;
    errors.pregnancyWeek = progressResult.errors.pregnancyWeek;
  }

  const hasError = Object.values(errors).some(Boolean);
  if (hasError || !progressResult.isValid) {
    return { errors, isValid: false };
  }

  return {
    errors: {
      age: undefined,
      dilationCm: undefined,
      gpa: undefined,
      motherName: undefined,
      pregnancyWeek: undefined,
    },
    isValid: true,
    value: {
      age: age as number,
      dilationCm: progressResult.value.dilationCm,
      gpa,
      motherName,
      pregnancyWeek: progressResult.value.pregnancyWeek,
    },
  };
}
