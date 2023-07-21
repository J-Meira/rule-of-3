import { useEffect, useMemo, useRef } from 'react';

import { object, number, string, ObjectSchema } from 'yup';
import { Formik, FormikProps } from 'formik';

import { Button, Input, useMultiContext } from '@j-meira/mui-theme';
import { Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import { Footer, Header } from './components';

import { useAppDispatch, useAppSelector } from './redux';
import {
  Close as CloseIcon,
  DeleteForever as DeleteForeverIcon,
} from '@mui/icons-material';
import { IOperation } from './types';
import { addOperation, deleteAll, removeLoading } from './redux/slices';
import { getDictionary } from './utils';

const initialOperation: IOperation = {
  a: null,
  b: null,
  c: null,
  x: null,
};

export const Main = () => {
  const dispatch = useAppDispatch();
  const { backgroundColor } = useMultiContext();
  const formRef = useRef<FormikProps<IOperation>>(null);
  const history = useAppSelector((state) => state.operations.history);
  const language = useAppSelector((state) => state.system.language);

  const schema = useMemo(
    (): ObjectSchema<IOperation> =>
      object({
        a: number().min(0).required(getDictionary('Required', language)),
        b: number().min(0).required(getDictionary('Required', language)),
        c: number().min(0).required(getDictionary('Required', language)),
        x: string().min(0).nullable(),
      }),
    [language],
  );

  const onSubmit = (data: IOperation) => {
    console.log(data);
    const { a, b, c } = data;
    let x = data.x;
    x = a && b && c ? (b * c) / a : 0;
    x = Number.isInteger(x) ? x : x.toFixed(2);
    dispatch(
      addOperation({
        ...data,
        x: x,
      }),
    );
    formRef.current?.setFieldValue('x', x);
  };

  const KeySpect = (
    e: React.KeyboardEvent<
      | HTMLInputElement
      | HTMLButtonElement
      | HTMLDivElement
      | HTMLTextAreaElement
    >,
  ) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      formRef.current?.handleSubmit();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeLoading());
    }, 2000);

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Paper
        sx={{ backgroundColor: backgroundColor }}
        square
        elevation={0}
        className='main-container'
      >
        <Formik
          initialValues={initialOperation}
          validationSchema={schema}
          onSubmit={(values) => onSubmit(values)}
          enableReinitialize
          innerRef={formRef}
        >
          {({ handleReset, handleSubmit }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Input
                  name='a'
                  label='A'
                  model='number'
                  autoFocus
                  onKeyDown={KeySpect}
                  grid={{
                    lg: 4,
                    md: 4,
                    sm: 4,
                    xs: 4,
                  }}
                />
                <Grid
                  item
                  xs={2}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  {getDictionary('To', language)}
                </Grid>
                <Input
                  name='b'
                  label='B'
                  model='number'
                  onKeyDown={KeySpect}
                  grid={{
                    lg: 4,
                    md: 4,
                    sm: 4,
                    xs: 4,
                  }}
                />
                <Grid item xs={1}></Grid>
                <Grid
                  item
                  xs={12}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    paddingTop: '0 !important',
                    marginBottom: '-16px',
                  }}
                >
                  <CloseIcon />
                </Grid>
                <Grid item xs={1}></Grid>
                <Input
                  name='c'
                  label='C'
                  model='number'
                  onKeyDown={KeySpect}
                  grid={{
                    lg: 4,
                    md: 4,
                    sm: 4,
                    xs: 4,
                  }}
                />
                <Grid
                  item
                  xs={2}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  {getDictionary('To', language)}
                </Grid>
                <Input
                  name='x'
                  label='X'
                  disabled
                  className='result'
                  model='number'
                  onKeyDown={KeySpect}
                  grid={{
                    lg: 4,
                    md: 4,
                    sm: 4,
                    xs: 4,
                  }}
                />
                <Grid item xs={1}></Grid>
                <Grid item xs={12} className='actions'>
                  <Button
                    color='secondary'
                    fullWidth={false}
                    onClick={() => handleReset()}
                  >
                    {getDictionary('Reset', language)}
                  </Button>
                  <Button fullWidth={false} onClick={() => handleSubmit()}>
                    {getDictionary('Calculate', language)}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
        <Card className='history'>
          <Button
            className='clear-btn'
            title={getDictionary('Clear', language)}
            model='icon'
            color='secondary'
            onClick={() => dispatch(deleteAll())}
          >
            <DeleteForeverIcon />
          </Button>
          <Typography variant='h2'>
            {getDictionary('History', language)}
          </Typography>
          <CardContent className='history-container'>
            {history.map((item, index) => (
              <Grid key={'operation' + index} container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                  {item.a}
                </Grid>
                <Grid item xs={2}>
                  {getDictionary('To', language)}
                </Grid>
                <Grid item xs={4}>
                  {item.b}
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                  {item.c}
                </Grid>
                <Grid item xs={2}>
                  {getDictionary('To', language)}
                </Grid>
                <Grid item xs={4}>
                  {item.x}
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>
      </Paper>
      <Footer />
    </>
  );
};
