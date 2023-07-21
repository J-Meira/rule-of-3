export interface IDictionary {
  [key: string]: IDictionaryLanguage;
}

export interface IDictionaryLanguage {
  Developed: string;
  SettingsOpen: string;
  Settings: string;
  Language: string;
  DarkMode: string;
  LightMode: string;
  Required: string;
  Reset: string;
  Calculate: string;
  Clear: string;
  History: string;
  To: string;
}
