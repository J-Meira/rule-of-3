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
          light: '#4db6ac',
          main: '#009688',
          dark: '00695f',
          contrastText: '#fff',
        },
        secondary: {
          light: '#74706f',
          main: '#494544',
          dark: '#221e1d',
          contrastText: '#fff',
        },
      }}
    >
      {children}
    </MultiProvider>
  );
};
