import React, { useState } from 'react';

import { Button, Grid, TextField } from '@mui/material';
import Footer from './componets/footer';

import './App.scss';

const InitialValues = {
  a: null,
  b: null,
  c: null,
  x: 0,
}

const App = () => {
  const [values, setValues] = useState(InitialValues);

  const handle = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setValues({
      ...values,
      [name]: Number(value)
    })
  }

  const calculate = () =>{
    const { a,b,c} = values;
    console.log(a,b,c);
    setValues({
      ...values,
      x: (b*c)/a
    })
  }

  return (
    <div className='app'>
      <Grid container className='main' spacing={3}>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            size='small'
            id='a'
            label='A'
            name='a'
            type='number'
            value={values.a}
            onChange={handle}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            size='small'
            id='c'
            label='C'
            name='c'
            type='number'
            value={values.c}
            onChange={handle}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            size='small'
            id='b'
            label='B'
            name='b'
            type='number'
            value={values.b}
            onChange={handle}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            size='small'
            id='x'
            label='X'
            name='x'
            type='number'
            value={values.x}
            onChange={handle}
            required
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant='contained'
            onClick={calculate}
          >
            Calculate
          </Button>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default App;
