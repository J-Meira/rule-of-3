import { useState } from 'react';

import { useMultiContext } from '@j-meira/mui-theme';
import { Grid, Paper } from '@mui/material';
import { Footer, Header } from './components';

import { useAppDispatch } from './redux';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { backgroundColor } = useMultiContext();

  return (
    <>
      <Header />
      <Paper
        sx={{ backgroundColor: backgroundColor }}
        square
        elevation={0}
        className='main-container'
      >
        {/* <Grid container spacing={2}> */}
        <div className='test'>test</div>
        {/* </Grid> */}
      </Paper>
      <Footer />
    </>
  );
};
