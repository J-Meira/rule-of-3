import {
  DarkSwitch,
  Input,
  PopUp,
  useMultiContext,
} from '@j-meira/mui-theme';
import { Grid, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux';

import { IPopUp } from '.';

import { languageEnum } from '../../enums';
import { handleLanguage } from '../../redux/slices';
import { enumToList, getDictionary } from '../../utils';

export const SettingsPopUp = ({ open, toggle }: IPopUp) => {
  const dispatch = useAppDispatch();
  const { dark } = useMultiContext();
  const language = useAppSelector((state) => state.system.language);

  return (
    <PopUp
      className='pop-up-list-form'
      name='list-form'
      title={getDictionary('settings', language)}
      open={open}
      toggle={toggle}
      grided
      maxWidth='sm'
      action={toggle}
      disableRestoreFocus
    >
      <Input
        label={getDictionary('language', language)}
        name='language'
        value={language}
        required
        model='select'
        isNoFormik
        NoNativeOptions
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(handleLanguage(Number(e.target.value)))
        }
        options={enumToList(languageEnum)}
        grid={{
          md: 12,
          lg: 12,
        }}
      />
      <Grid
        item
        xs={12}
        display='flex'
        alignItems='center'
        flexWrap='wrap'
      >
        <DarkSwitch />
        <Typography sx={{ margin: '0 1rem' }} component='label'>
          {getDictionary(dark ? 'darkMode' : 'lightMode', language)}
        </Typography>
      </Grid>
    </PopUp>
  );
};
