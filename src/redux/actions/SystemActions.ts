import { DialogProps } from '@j-meira/mui-theme';
import { AppThunk } from '../Store';
import {
  setLoading,
  removeLoading,
  removeALLLoading,
  openDialog,
  closeDialog,
  handleAlerts,
  handleRows,
  handleLanguage,
  signIn,
  signOut,
  handleCurrency,
} from '../reducers';
import { IUser } from '../../types';

export const SetLoading = (): AppThunk => (dispatch) => {
  dispatch(setLoading());
};

export const RemoveLoading = (): AppThunk => (dispatch) => {
  dispatch(removeLoading());
};

export const RemoveALLLoading = (): AppThunk => (dispatch) => {
  dispatch(removeALLLoading());
};

export const OpenDialog =
  (payload: DialogProps): AppThunk =>
  (dispatch) => {
    dispatch(openDialog(payload));
  };

export const CloseDialog =
  (payload: boolean): AppThunk =>
  (dispatch) => {
    dispatch(closeDialog(payload));
  };

export const HandleAlerts =
  (payload: boolean): AppThunk =>
  (dispatch) => {
    dispatch(handleAlerts(payload));
  };

export const HandleRows =
  (payload: number): AppThunk =>
  (dispatch) => {
    dispatch(handleRows(payload));
  };

export const HandleLanguage =
  (payload: number): AppThunk =>
  (dispatch) => {
    dispatch(handleLanguage(payload));
  };

export const HandleCurrency =
  (payload: number): AppThunk =>
  (dispatch) => {
    dispatch(handleCurrency(payload));
  };

export const SignIn =
  (payload: IUser): AppThunk =>
  (dispatch) => {
    dispatch(signIn(payload));
  };

export const SignOut = (): AppThunk => (dispatch) => {
  dispatch(signOut());
};
