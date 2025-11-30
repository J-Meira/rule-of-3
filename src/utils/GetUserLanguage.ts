import { languageEnumState } from '../enums';

export const getUserLanguage = () => {
  if (typeof navigator === 'undefined' || !navigator.language) {
    return 3;
  }

  const userBrowserLanguage = navigator.language
    .split('-')[0]
    .toLowerCase();
  const languageKeys = Object.keys(languageEnumState).map(Number);
  const test = languageKeys.find(
    (i) => languageEnumState[i] === userBrowserLanguage,
  );
  return test ? test : 3;
};
