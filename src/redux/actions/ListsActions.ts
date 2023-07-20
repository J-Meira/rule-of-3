import { AppThunk } from '../Store';
import {
  addList,
  editList,
  getList,
  unselectList,
  deleteList,
  handleListStatus,
  addItem,
  editItem,
  deleteItem,
  clearList,
  deleteSelected,
  deleteAll,
  handleSelectedStatus,
  deleteItemSelected,
  handleSelectedItemsStatus,
} from '../reducers';
import {
  IItemListDelete,
  IItemListForm,
  IItemListSelected,
  IList,
  IListEdit,
} from '../../types';

export const AddList =
  (payload: IList): AppThunk =>
  (dispatch) => {
    dispatch(addList(payload));
  };

export const EditList =
  (payload: IListEdit): AppThunk =>
  (dispatch) => {
    dispatch(editList(payload));
  };

export const GetList =
  (payload: string): AppThunk =>
  (dispatch) => {
    dispatch(getList(payload));
  };
export const UnselectList = (): AppThunk => (dispatch) => {
  dispatch(unselectList());
};

export const DeleteList =
  (payload: string): AppThunk =>
  (dispatch) => {
    dispatch(deleteList(payload));
  };

export const HandleListStatus =
  (payload: string): AppThunk =>
  (dispatch) => {
    dispatch(handleListStatus(payload));
  };

export const AddItem =
  (payload: IItemListForm): AppThunk =>
  (dispatch) => {
    dispatch(addItem(payload));
  };

export const EditItem =
  (payload: IItemListForm): AppThunk =>
  (dispatch) => {
    dispatch(editItem(payload));
  };

export const DeleteItem =
  (payload: IItemListDelete): AppThunk =>
  (dispatch) => {
    dispatch(deleteItem(payload));
  };

export const DeleteItemSelected =
  (payload: IItemListSelected): AppThunk =>
  (dispatch) => {
    dispatch(deleteItemSelected(payload));
  };

export const HandleSelectedItemsStatus =
  (payload: IItemListSelected): AppThunk =>
  (dispatch) => {
    dispatch(handleSelectedItemsStatus(payload));
  };

export const ClearList =
  (payload: string): AppThunk =>
  (dispatch) => {
    dispatch(clearList(payload));
  };

export const DeleteSelected =
  (payload: string[]): AppThunk =>
  (dispatch) => {
    dispatch(deleteSelected(payload));
  };

export const HandleSelectedStatus =
  (payload: string[]): AppThunk =>
  (dispatch) => {
    dispatch(handleSelectedStatus(payload));
  };

export const DeleteAll = (): AppThunk => (dispatch) => {
  dispatch(deleteAll());
};
