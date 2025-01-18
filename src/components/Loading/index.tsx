import { Paper, Box, CircularProgress } from '@mui/material';
import { useMultiContext } from '@j-meira/mui-theme';

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
          height: '100%',
          opacity: [0.9, 0.8, 0.7],
          position: 'fixed',
          right: 0,
          top: 0,
          width: '100%',
          zIndex: 9998,
        }}
      />
      <Paper
        square
        sx={{
          alignItems: 'center',
          backgroundColor: 'transparent',
          display: isLoading ? 'flex' : 'none',
          height: '100%',
          justifyContent: 'center',
          position: 'fixed',
          right: 0,
          top: 0,
          width: '100%',
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: 120,
            justifyContent: 'center',
            m: 1,
            position: 'relative',
            width: 120,
          }}
        >
          <img
            style={{
              width: '80px',
            }}
            src={`/assets/logos/icon${dark ? '' : '-dark'}.svg`}
            alt='Icon Rule of 3'
          />
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
