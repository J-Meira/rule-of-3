export interface IDictionary {
  [key: string]: IDictionaryLanguage;
}

export interface IDictionaryLanguage {
  calculate: string;
  clear: string;
  darkMode: string;
  developed: string;
  history: string;
  language: string;
  lightMode: string;
  repeated: string;
  required: string;
  reset: string;
  settings: string;
  settingsOpen: string;
  to: string;
  update: string;
  version: string;
}
