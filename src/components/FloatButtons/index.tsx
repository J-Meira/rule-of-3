import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { IFloatButtonsProps } from '../../types';

const defaultProps: IFloatButtonsProps = {
  addLabel: 'Add',
  clearLabel: 'Clear',
};

export const FloatButtons = ({
  add,
  addLabel,
  clear,
  clearLabel,
}: IFloatButtonsProps) => (
  <div className='float-button'>
    {clear && (
      <Fab color='error' aria-label={clearLabel} onClick={clear}>
        <DeleteSweepIcon />
      </Fab>
    )}
    {add && (
      <Fab color='primary' aria-label={addLabel} onClick={add}>
        <AddIcon />
      </Fab>
    )}
  </div>
);

FloatButtons.defaultProps = defaultProps;
