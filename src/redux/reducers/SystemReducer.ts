import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

import { DialogProps } from '@j-meira/mui-theme';
import { ISystemState, IUser } from '../../types';

export const InitialDialog: DialogProps = {
  cancel: true,
  message: '',
  open: false,
  origin: '',
  successLabel: 'Ok',
  title: '',
  return: {},
};

const localLanguage = localStorage.getItem('SL_L_L') || '1';
const localCurrency = localStorage.getItem('SL_L_C') || '1';
const localRowsPerPage = localStorage.getItem('SL_L_RPP') || '10';
const localUser = localStorage.getItem('SL_L_U');
const localAlerts = localStorage.getItem('SL_D_A') || 'false';

const initialState: ISystemState = {
  dialog: InitialDialog,
  dismissAlerts: JSON.parse(localAlerts),
  loadingCount: 0,
  language: JSON.parse(localLanguage),
  currency: JSON.parse(localCurrency),
  rowsPerPage: Number(localRowsPerPage),
  user: localUser ? JSON.parse(localUser) : undefined,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loadingCount += 1;
    },
    removeLoading: (state) => {
      state.loadingCount -= 1;
    },
    removeALLLoading: (state) => {
      state.loadingCount = 0;
    },
    openDialog: (state, { payload }: PayloadAction<DialogProps>) => {
      state.dialog = payload;
    },
    closeDialog: (state, { payload }: PayloadAction<boolean>) => {
      state.dialog = {
        ...InitialDialog,
        return: {
          origin: state.dialog.origin,
          status: payload,
        },
      };
    },
    handleAlerts: (state, { payload }: PayloadAction<boolean>) => {
      localStorage.setItem('SL_D_A', JSON.stringify(payload));
      state.dismissAlerts = payload;
    },
    handleRows: (state, { payload }: PayloadAction<number>) => {
      localStorage.setItem('SL_L_RPP', JSON.stringify(payload));
      state.rowsPerPage = payload;
    },
    handleLanguage: (state, { payload }: PayloadAction<number>) => {
      localStorage.setItem('SL_L_L', JSON.stringify(payload));
      state.language = payload;
    },
    handleCurrency: (state, { payload }: PayloadAction<number>) => {
      localStorage.setItem('SL_L_C', JSON.stringify(payload));
      state.currency = payload;
    },
    signIn: (state, { payload }: PayloadAction<IUser>) => {
      localStorage.setItem('SL_L_U', JSON.stringify(payload));
      state.user = payload;
    },
    signOut: (state) => {
      // localStorage.removeItem('SL_L_L');
      // localStorage.removeItem('SL_L_RPP');
      // localStorage.removeItem('SL_L_U');
      // localStorage.removeItem('SL_D_A');
      localStorage.clear();
      state.user = undefined;
    },
  },
});

export const {
  setLoading,
  removeLoading,
  removeALLLoading,
  openDialog,
  closeDialog,
  handleAlerts,
  handleRows,
  handleLanguage,
  handleCurrency,
  signIn,
  signOut,
} = systemSlice.actions;

export const getLoading = (state: RootState): boolean =>
  state.system.loadingCount > 0;

export const getAuthenticated = (state: RootState): boolean =>
  !!(state.system.user && state.system.user.name);

export default systemSlice.reducer;
