import React, { useState } from 'react';

import {
  Popover,
  Typography
} from '@mui/material';

const Footer = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const date = new Date();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const convertNumber = (value) => {
    switch (value) {
      case 0:
        value = '00';
        break;
      case 1:
        value = '01';
        break;
      case 2:
        value = '02';
        break;
      case 3:
        value = '03';
        break;
      case 4:
        value = '04';
        break;
      case 5:
        value = '05';
        break;
      case 6:
        value = '06';
        break;
      case 7:
        value = '07';
        break;
      case 8:
        value = '08';
        break;
      case 9:
        value = '09';
        break;
      default:
        value = String(value);
        break;
    }
    return value
  };

  const getReleaseDate = (value) => {
    let date = new Date(value);
    return (`De: ${convertNumber(date.getDate())}/${
      convertNumber(date.getMonth() + 1)}/${
      convertNumber(date.getFullYear())} as ${
      convertNumber(date.getHours() - 3)}:${
      convertNumber(date.getMinutes())}`);
  };

  return (
    <div className='footer'>
      <smalll
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {process.env.REACT_APP_VERSION}
      </smalll>
      <small> Developed by
        <a href='https://www.jmcreative.com.br' rel='noopener noreferrer' target='_blank'>
          <b> JM Creative</b>
        </a> © 2007 - {date.getFullYear()}
      </small>
      <Popover
        id='mouse-over-popover'
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
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
        <Typography sx={{ p: 1 }}>{getReleaseDate(process.env.REACT_APP_V_DATE)}</Typography>
      </Popover>
    </div>
  );
}

export default Footer;
