import { memo, useCallback, useState } from 'react';

import { Button, Header as MuiHeader } from '@j-meira/mui-theme';
import { MdSettings as SettingsIcon } from 'react-icons/md';

import { SettingsPopUp } from '..';

import { useAppSelector } from '../../redux';
import { getDictionary } from '../../utils';

export const Header = memo(() => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const language = useAppSelector((state) => state.system.language);

  const handleOpenSettings = useCallback(() => {
    setOpenPopUp(true);
  }, []);

  const handleTogglePopUp = useCallback(() => {
    setOpenPopUp((prev) => !prev);
  }, []);

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
            onClick={handleOpenSettings}
            title={getDictionary('settingsOpen', language)}
          >
            <SettingsIcon />
          </Button>

          <SettingsPopUp open={openPopUp} toggle={handleTogglePopUp} />
        </>
      }
    />
  );
});

Header.displayName = 'Header';
