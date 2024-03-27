import { useTypedSelector } from "./useTypedSelector";

export const useCurrentDayData = () => {
  const {currentDay, days} = useTypedSelector(store => store.day);
  let currentDayData = days.find(d => d.date === currentDay);

  return {
    color: currentDayData?.color,
    date: currentDayData?.date,
    tasks: currentDayData?.tasks,
  };
}