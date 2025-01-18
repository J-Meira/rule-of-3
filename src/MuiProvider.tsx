import { MultiProvider } from '@j-meira/mui-theme';

import { useAppSelector } from './redux';
import { IMuiProviderProps } from './types';

export const MuiProvider = ({ children }: IMuiProviderProps) => {
  const language = useAppSelector((state) => state.system.language);

  return (
    <MultiProvider
      adapterLocalePtBR={language === 3}
      snackAnchorHorizontal='right'
      snackAnchorVertical='top'
      snackAutoHideDuration={3000}
      snackMax={3}
      palette={{
        primary: {
          light: '#a02b95',
          main: '#93278F',
          dark: '#822187',
          contrastText: '#fff',
        },
        secondary: {
          light: '#826c7d',
          main: '#6e5869',
          dark: '#4e3949',
          contrastText: '#fff',
        },
      }}
    >
      {children}
    </MultiProvider>
  );
};
