export const generateID = (type: string) => {
  let mask = '';
  if (type.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (type.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (type.indexOf('#') > -1) mask += '0123456789';
  if (type.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  let result = '';
  for (let i = 25; i > 0; --i)
    result += mask[Math.floor(Math.random() * mask.length)];
  return result;
};
