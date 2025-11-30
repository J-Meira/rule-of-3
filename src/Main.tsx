import { useCallback, useEffect, useMemo, useRef } from 'react';

import { object, number, string, ObjectSchema } from 'yup';
import { Formik, FormikProps } from 'formik';

import {
  Button,
  Input,
  useMultiContext,
  useToast,
} from '@j-meira/mui-theme';
import { Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import {
  MdClose as CloseIcon,
  MdDeleteForever as DeleteForeverIcon,
} from 'react-icons/md';

import { Footer, Header } from './components';

import { useAppDispatch, useAppSelector } from './redux';
import { addOperation, deleteAll, removeLoading } from './redux/slices';
import { IOperation } from './types';
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
        a: number().required(getDictionary('required', language)),
        b: number().required(getDictionary('required', language)),
        c: number().required(getDictionary('required', language)),
        x: string().nullable(),
      }),
    [language],
  );

  const onSubmit = (data: IOperation) => {
    if (
      history[0] &&
      JSON.stringify(history[0]) === JSON.stringify(data)
    ) {
      useToast.warning(getDictionary('repeated', language));
      return;
    }

    const { a, b, c } = data;
    const calculatedValue = a && b && c ? (b * c) / a : 0;
    const x = Number.isInteger(calculatedValue)
      ? calculatedValue
      : calculatedValue.toFixed(2);

    dispatch(
      addOperation({
        ...data,
        x: x,
      }),
    );
    formRef.current?.setFieldValue('x', x);
  };

  const handleDeleteAll = useCallback(() => {
    dispatch(deleteAll());
  }, [dispatch]);

  const KeySpect = useCallback(
    (
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
    },
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeLoading());
    }, 1000);

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
                <Grid size={1}></Grid>
                <Input
                  name='a'
                  label='A'
                  model='number'
                  decimal
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
                  size={2}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  {getDictionary('to', language)}
                </Grid>
                <Input
                  name='b'
                  label='B'
                  model='number'
                  decimal
                  onKeyDown={KeySpect}
                  grid={{
                    lg: 4,
                    md: 4,
                    sm: 4,
                    xs: 4,
                  }}
                />
                <Grid size={1}></Grid>
                <Grid
                  size={12}
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
                <Grid size={1}></Grid>
                <Input
                  name='c'
                  label='C'
                  model='number'
                  decimal
                  onKeyDown={KeySpect}
                  grid={{
                    lg: 4,
                    md: 4,
                    sm: 4,
                    xs: 4,
                  }}
                />
                <Grid
                  size={2}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  {getDictionary('to', language)}
                </Grid>
                <Input
                  name='x'
                  label='X'
                  model='number'
                  disabled
                  className='result'
                  grid={{
                    lg: 4,
                    md: 4,
                    sm: 4,
                    xs: 4,
                  }}
                />
                <Grid size={1}></Grid>
                <Grid size={12} className='actions'>
                  <Button
                    color='secondary'
                    fullWidth={false}
                    onClick={() => handleReset()}
                  >
                    {getDictionary('reset', language)}
                  </Button>
                  <Button fullWidth={false} onClick={() => handleSubmit()}>
                    {getDictionary('calculate', language)}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
        <Card className='history'>
          <Button
            className='clear-btn'
            title={getDictionary('clear', language)}
            model='icon'
            color='secondary'
            onClick={handleDeleteAll}
          >
            <DeleteForeverIcon />
          </Button>
          <Typography variant='h2'>
            {getDictionary('history', language)}
          </Typography>
          <CardContent className='history-container'>
            {history.map((item, index) => (
              <Grid key={'operation' + index} container spacing={2}>
                <Grid size={1}></Grid>
                <Grid size={4}>{item.a}</Grid>
                <Grid size={2}>{getDictionary('to', language)}</Grid>
                <Grid size={4}>{item.b}</Grid>
                <Grid size={1}></Grid>
                <Grid size={1}></Grid>
                <Grid size={4}>{item.c}</Grid>
                <Grid size={2}>{getDictionary('to', language)}</Grid>
                <Grid size={4}>{item.x}</Grid>
                <Grid size={1}></Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>
      </Paper>
      <Footer />
    </>
  );
};
