import { useState } from 'react';

import { Button, Header as MuiHeader } from '@j-meira/mui-theme';
import { MdSettings as SettingsIcon } from 'react-icons/md';

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
          <img
            alt='Logo Rule of 3'
            className='logo'
            src='/assets/logos/logo-invert.svg'
          />
          <Button
            className='settings-btn'
            model='icon'
            onClick={() => setOpenPopUp(true)}
            title={getDictionary('settingsOpen', language)}
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
