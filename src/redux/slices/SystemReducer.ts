import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

import { DialogProps } from '@j-meira/mui-theme';
import { ISystemState } from '../../types';
import { getUserLanguage } from '../../utils';

export const InitialDialog: DialogProps = {
  cancel: true,
  message: '',
  open: false,
  origin: '',
  successLabel: 'Ok',
  title: '',
  return: {},
};

const localLanguage = localStorage.getItem('RO3_L_L')
  ? JSON.parse(localStorage.getItem('RO3_L_L')!)
  : getUserLanguage();

const initialState: ISystemState = {
  loadingCount: 1,
  language: localLanguage,
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
    handleLanguage: (state, { payload }: PayloadAction<number>) => {
      localStorage.setItem('RO3_L_L', JSON.stringify(payload));
      state.language = payload;
    },
    clearData: () => {
      localStorage.clear();
    },
  },
});

export const {
  setLoading,
  removeLoading,
  removeALLLoading,
  handleLanguage,
  clearData,
} = systemSlice.actions;

export const getLoading = (state: RootState): boolean =>
  state.system.loadingCount > 0;

export default systemSlice.reducer;
