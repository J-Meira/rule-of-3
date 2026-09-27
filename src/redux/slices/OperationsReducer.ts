import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IOperation, IOperationsState } from '../../types';

const storedHistory: (IOperation & { id?: number })[] = JSON.parse(
  localStorage.getItem('RO3_O_H') || '[]',
);

const initialState: IOperationsState = {
  history: storedHistory.map((operation, index) => ({
    ...operation,
    id: operation.id ?? index + 1,
  })),
};

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addOperation: (state, { payload }: PayloadAction<IOperation>) => {
      state.history.unshift({ ...payload, id: Date.now() });
      localStorage.setItem('RO3_O_H', JSON.stringify(state.history));
    },
    deleteAll: (state) => {
      localStorage.removeItem('RO3_O_H');
      state.history = [];
    },
  },
});

export const { addOperation, deleteAll } = listsSlice.actions;

export default listsSlice.reducer;
