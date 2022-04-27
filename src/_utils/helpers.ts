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

export const stripTags = (input: string, allowed?: string) => {
  if (!input) return input;

  allowed = (
    ((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
  ).join('');
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
  });
};
