import { dictionary, languageEnumState } from '../enums';
import { IDictionaryLanguage } from '../types';

export const getDictionary = (
  key: keyof IDictionaryLanguage,
  language: number,
): string => {
  return dictionary[languageEnumState[language]][key];
};
