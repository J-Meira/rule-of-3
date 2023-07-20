import { DialogProps } from '@j-meira/mui-theme';
import { IUser } from './User';

export interface ISystemState {
  dialog: DialogProps;
  dismissAlerts: boolean;
  loadingCount: number;
  language: number;
  currency: number;
  rowsPerPage: number;
  user?: IUser;
}
