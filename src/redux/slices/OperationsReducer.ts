import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IOperation, IOperationsState } from '../../types';

const localLists = localStorage.getItem('RO3_O_H') || '[]';

const initialState: IOperationsState = {
  history: JSON.parse(localLists),
};

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addOperation: (state, { payload }: PayloadAction<IOperation>) => {
      const newList = state.history;
      newList.unshift(payload);
      localStorage.setItem('RO3_O_H', JSON.stringify(newList));
      state.history = newList;
    },
    deleteAll: (state) => {
      localStorage.removeItem('RO3_O_H');
      state.history = [];
    },
  },
});

export const { addOperation, deleteAll } = listsSlice.actions;

export default listsSlice.reducer;
