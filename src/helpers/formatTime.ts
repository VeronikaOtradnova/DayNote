export function formatTime(timeInMillis: number) {
  const date = new Date(timeInMillis);
  
  // Получаем часы и минуты из объекта Date
  let hours = date.getUTCHours().toString();
  let minutes = date.getUTCMinutes().toString();
  
  // Форматируем часы и минуты в виде двухзначных чисел
  hours = hours.padStart(2, '0');
  minutes = minutes.padStart(2, '0');
  
  // Возвращаем строку в формате 'hh:mm'
  return `${hours}:${minutes}`;
}