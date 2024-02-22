export const getTodayMs = () => {
  return +(new Date().setHours(0, 0, 0, 0));
}