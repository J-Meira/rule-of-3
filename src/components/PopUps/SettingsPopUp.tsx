import {
  DarkSwitch,
  Input,
  PopUp,
  useMultiContext,
} from '@j-meira/mui-theme';
import { Grid2, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux';

import { languageEnum } from '../../enums';
import { handleLanguage } from '../../redux/slices';
import { IPopUp } from '../../types';
import { enumToList, getDictionary } from '../../utils';

export const SettingsPopUp = ({ open, toggle }: IPopUp) => {
  const dispatch = useAppDispatch();
  const { dark } = useMultiContext();
  const language = useAppSelector((state) => state.system.language);

  return (
    <PopUp
      action={toggle}
      className='pop-up-list-form'
      disableRestoreFocus
      grided
      maxWidth='sm'
      name='list-form'
      open={open}
      title={getDictionary('settings', language)}
      toggle={toggle}
    >
      <Input
        grid={{
          md: 12,
          lg: 12,
        }}
        label={getDictionary('language', language)}
        localControl
        model='select'
        name='language'
        noNativeOptions
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(handleLanguage(Number(e.target.value)))
        }
        options={enumToList(languageEnum)}
        required
        value={language}
      />
      <Grid2 size={12} display='flex' alignItems='center' flexWrap='wrap'>
        <DarkSwitch />
        <Typography sx={{ margin: '0 1rem' }} component='label'>
          {getDictionary(dark ? 'darkMode' : 'lightMode', language)}
        </Typography>
      </Grid2>
    </PopUp>
  );
};
