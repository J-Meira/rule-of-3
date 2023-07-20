import { useState } from 'react';
import moment from 'moment';

import { Paper, Popover, Typography } from '@mui/material';

export const Footer = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const getReleaseDate = () => {
    return moment(process.env.REACT_APP_V_DATE || '2022-05-04T13:23:52')
      .subtract(3, 'hours')
      .format('MM/DD/YYYY - hh:mm A');
  };

  const openPopover = Boolean(anchorEl);

  return (
    <footer>
      <Paper square elevation={4}>
        <Typography
          component='small'
          aria-owns={openPopover ? 'version-date-popover' : undefined}
          aria-haspopup='true'
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {process.env.REACT_APP_VERSION}
        </Typography>
        <Typography component='small'>
          {' '}
          Developed by
          <a
            href='https://www.jmcreative.com.br'
            rel='noopener noreferrer'
            target='_blank'
          >
            <b> JM Creative</b>
          </a>{' '}
          © 2007 - {moment().year()}
        </Typography>
        <Popover
          id='version-date-popover'
          sx={{
            pointerEvents: 'none',
          }}
          open={openPopover}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>{getReleaseDate()}</Typography>
        </Popover>
      </Paper>
    </footer>
  );
};
