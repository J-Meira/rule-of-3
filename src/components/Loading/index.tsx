import { Paper, Box, CircularProgress } from '@mui/material';
import { useMultiContext } from '@j-meira/mui-theme';

import { ReactComponent as LogoDark } from '../../assets/icon-dark.svg';
import { ReactComponent as Logo } from '../../assets/icon.svg';

import { useAppSelector } from '../../redux';
import { getLoading } from '../../redux/slices';

export const Loading = () => {
  const { dark } = useMultiContext();
  const isLoading = useAppSelector(getLoading);

  return (
    <>
      <Paper
        square
        sx={{
          display: isLoading ? 'flex' : 'none',
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          right: 0,
          zIndex: 9998,
          opacity: [0.9, 0.8, 0.7],
        }}
      />
      <Paper
        square
        sx={{
          display: isLoading ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: 'transparent',
        }}
      >
        <Box
          sx={{
            m: 1,
            position: 'relative',
            width: 120,
            height: 120,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {dark ? (
            <LogoDark
              style={{
                width: '100px',
              }}
            />
          ) : (
            <Logo
              style={{
                width: '100px',
              }}
            />
          )}
          <CircularProgress
            size={118}
            sx={{
              position: 'absolute',
              zIndex: 1,
            }}
          />
        </Box>
      </Paper>
    </>
  );
};
