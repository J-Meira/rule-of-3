import { useState } from 'react';

import { Button, Header as MuiHeader } from '@j-meira/mui-theme';
import { Settings as SettingsIcon } from '@mui/icons-material';

import Logo from '../../assets/logo-invert.svg';

import { SettingsPopUp } from '..';

import { useAppSelector } from '../../redux';
import { getDictionary } from '../../utils';

export const Header = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const language = useAppSelector((state) => state.system.language);

  return (
    <MuiHeader
      navigation={
        <>
          <img className='logo' src={Logo} alt='Logo ShopList' />
          <Button
            className='settings-btn'
            title={getDictionary('settingsOpen', language)}
            model='icon'
            onClick={() => setOpenPopUp(true)}
          >
            <SettingsIcon />
          </Button>

          <SettingsPopUp
            open={openPopUp}
            toggle={() => setOpenPopUp(!openPopUp)}
          />
        </>
      }
    />
  );
};
