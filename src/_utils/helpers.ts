export const getMiliSeconds = (str: string): number => {
  if (typeof Number(str) === 'number' && !isNaN(Number(str))) {
    return +str;
  }
  let miliSeconds = 0;
  const days = str?.match(/(\d+)\s*d/);
  const hours = str?.match(/(\d+)\s*h/);
  const minutes = str?.match(/(\d+)\s*m/);
  if (days) {
    miliSeconds += parseInt(days[1]) * 86400000;
  }
  if (hours) {
    miliSeconds += parseInt(hours[1]) * 3600000;
  }
  if (minutes) {
    miliSeconds += parseInt(minutes[1]) * 60000;
  }

  return miliSeconds;
};

export function deepSearch(arr: any[], item: string) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && deepSearch(arr[i], item)) {
      return true;
    } else if (arr[i] === item) {
      return true;
    }
  }
  return false;
}
