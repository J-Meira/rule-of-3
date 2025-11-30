import { memo, useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import { Paper, Popover, Typography } from '@mui/material';

import { useAppSelector } from '../../redux';
import { getDictionary } from '../../utils';

export const Footer = memo(() => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const language = useAppSelector((state) => state.system.language);

  const handlePopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const releaseDate = useMemo(() => {
    return dayjs(import.meta.env.VITE_V_DATE || '2022-05-04T13:23:52')
      .subtract(3, 'hours')
      .format('MM/DD/YYYY - hh:mm A');
  }, []);

  const openPopover = Boolean(anchorEl);

  return (
    <footer>
      <Paper square elevation={4}>
        <Typography
          aria-haspopup='true'
          aria-owns={openPopover ? 'version-date-popover' : undefined}
          component='small'
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {import.meta.env.VITE_VERSION}
        </Typography>
        <Typography component='small'>
          {getDictionary('developed', language)}
          <a
            href='https://www.jm.app.br'
            rel='noopener noreferrer'
            target='_blank'
          >
            <b>JM APP</b>
          </a>{' '}
          © 2007 - {dayjs().year()}
        </Typography>
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          disableRestoreFocus
          id='version-date-popover'
          onClose={handlePopoverClose}
          open={openPopover}
          sx={{
            pointerEvents: 'none',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 1 }}>{`${releaseDate} (UTC-3)`}</Typography>
        </Popover>
      </Paper>
    </footer>
  );
});

Footer.displayName = 'Footer';
