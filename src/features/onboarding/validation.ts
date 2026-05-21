
export const isValidPregnancyWeek = (week: string): boolean => {
  const parsed = parseInt(week, 10);
  if (isNaN(parsed)) return false;
  return parsed > 0 && parsed <= 42;
};
