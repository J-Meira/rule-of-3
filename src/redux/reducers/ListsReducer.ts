import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  IItemListDelete,
  IItemListForm,
  IList,
  IListsState,
  IListEdit,
  IItemListSelected,
} from '../../types';
import { getListTotal } from '../../utils';

const localLists = localStorage.getItem('SL_M_L') || '[]';

const initialState: IListsState = {
  records: JSON.parse(localLists),
  // records: [
  //   {
  //     _id: 'fdsfd32gjsfh273s',
  //     name: '01my first list test',
  //     items: [
  //       {
  //         _id: 'swdsafdsfd32gjsfh273s',
  //         description: 'string',
  //         quantity: 1,
  //         unityPrice: '1.00',
  //         total: '1.00',
  //         status: false,
  //       },
  //       {
  //         _id: 'hyrytjfdsfd32gjsfh273s',
  //         description: ' ssstring',
  //         quantity: 2,
  //         unityPrice: '4.00',
  //         total: '8.00',
  //         status: true,
  //       },
  //       {
  //         _id: 'lklfdsfd32dfdgjsfh273s',
  //         description: 'string',
  //         quantity: 4,
  //         unityPrice: '0.30',
  //         total: '1.20',
  //         status: false,
  //       },
  //       {
  //         _id: 'swdqewqsafdsfd32gjsfh273s',
  //         description: 'string',
  //         quantity: 12,
  //         unityPrice: '10.00',
  //         total: '120.00',
  //         status: false,
  //       },
  //       {
  //         _id: 'hewqyrytjfdsfd32gjsfh273s',
  //         description: ' ssstring',
  //         quantity: 22,
  //         unityPrice: '0.55',
  //         total: '12.65',
  //         status: true,
  //       },
  //       {
  //         _id: 'lkewqlfdsfd32dfdgjsfh273s',
  //         description: 'string',
  //         quantity: 24,
  //         unityPrice: '10.10',
  //         total: '242.40',
  //         status: false,
  //       },
  //     ],
  //     total: '0.00',
  //     status: true,
  //   },
  //   {
  //     _id: 'dsf732v673f624f6',
  //     name: '02second list',
  //     items: [],
  //     total: '0.00',
  //     status: false,
  //   },
  //   {
  //     _id: 'f23hjkd29sfld0aa',
  //     name: '03random list 1',
  //     items: [],
  //     total: '0.00',
  //     status: true,
  //   },
  //   {
  //     _id: 'g5dh7f6s2hjdf934',
  //     name: '04shopping list',
  //     items: [],
  //     total: '0.00',
  //     status: false,
  //   },
  //   {
  //     _id: '92jklsdf90jfss23',
  //     name: '05vacation essentials',
  //     items: [],
  //     total: '0.00',
  //     status: true,
  //   },
  //   {
  //     _id: '8dhf764nbg7dms83',
  //     name: '06wishlist',
  //     items: [],
  //     total: '0.00',
  //     status: false,
  //   },
  //   {
  //     _id: 'm3dsf65n8djs04jf',
  //     name: '07work tasks',
  //     items: [],
  //     total: '0.00',
  //     status: true,
  //   },
  //   {
  //     _id: 'f823hfg6s6s89k2d',
  //     name: '08grocery list',
  //     items: [],
  //     total: '0.00',
  //     status: false,
  //   },
  //   {
  //     _id: 'j39slf0s9fj4klg5',
  //     name: '09bucket list',
  //     items: [],
  //     total: '0.00',
  //     status: true,
  //   },
  //   {
  //     _id: '34jhg7j78dfkj345',
  //     name: '10project tasks',
  //     items: [],
  //     total: '0.00',
  //     status: false,
  //   },
  //   {
  //     _id: 'r8fjskd8934gh7ew',
  //     name: '11wishlist',
  //     items: [],
  //     total: '0.00',
  //     status: true,
  //   },
  //   {
  //     _id: '3shy8jsdf9f53j48',
  //     name: '12weekly goals',
  //     items: [],
  //     total: '0.00',
  //     status: false,
  //   },
  //   {
  //     _id: '8jkdf9jds9fs934h',
  //     name: '13household chores',
  //     items: [],
  //     total: '0.00',
  //     status: true,
  //   },
  //   {
  //     _id: 'h8jgdf93jds93k4k',
  //     name: '14books to read',
  //     items: [],
  //     total: '0.00',
  //     status: false,
  //   },
  //   {
  //     _id: '34kdfh9s9f384jss',
  //     name: '15fitness goals',
  //     items: [],
  //     total: '0.00',
  //     status: true,
  //   },
  //   {
  //     _id: 'f93jk4k9sdf8731h',
  //     name: '16party supplies',
  //     items: [],
  //     total: '0.00',
  //     status: false,
  //   },
  //   {
  //     _id: '93jsdf934j53j8hs',
  //     name: '17travel checklist',
  //     items: [],
  //     total: '0.00',
  //     status: true,
  //   },
  //   {
  //     _id: '4ksdf9384hsjdf94',
  //     name: '18daily routine',
  //     items: [],
  //     total: '0.00',
  //     status: false,
  //   },
  //   {
  //     _id: '9dfg83kdfj9s348j',
  //     name: '19home improvement',
  //     items: [],
  //     total: '0.00',
  //     status: true,
  //   },
  //   {
  //     _id: '3jkdf83jsdf74kdf',
  //     name: '20birthday wishlist',
  //     items: [],
  //     total: '0.00',
  //     status: false,
  //   },
  //   {
  //     _id: 'f84jkdf93sdf873j',
  //     name: '21study plan',
  //     items: [],
  //     total: '0.00',
  //     status: true,
  //   },
  //   {
  //     _id: '3jk4gdf9sdf74kdf',
  //     name: '22music playlist',
  //     items: [],
  //     total: '0.00',
  //     status: false,
  //   },
  // ],
};

const updateLists = (lists: IList[]) => {
  localStorage.setItem('SL_M_L', JSON.stringify(lists));
};

export const initialList: IList = {
  _id: '',
  name: '',
  items: [],
  total: '0.00',
  status: false,
};

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, { payload }: PayloadAction<IList>) => {
      const newListAdd = state.records.concat([{ ...payload }]);
      updateLists(newListAdd);
      state.records = newListAdd;
    },
    editList: (state, { payload }: PayloadAction<IListEdit>) => {
      const { _id, name } = payload;
      const newListEdit = state.records.map((item) =>
        item._id === _id
          ? {
              ...item,
              name: name,
            }
          : item,
      );
      updateLists(newListEdit);
      state.records = newListEdit;
      if (state.selected && state.selected._id === _id)
        state.selected.name = name;
    },
    getList: (state, { payload }: PayloadAction<string>) => {
      const valueReturn = state.records.find(
        (item) => item._id === payload,
      );
      state.selected = valueReturn || null;
    },
    unselectList: (state) => {
      state.selected = undefined;
    },
    deleteList: (state, { payload }: PayloadAction<string>) => {
      const newListDelete = state.records.filter(
        (item) => item._id !== payload,
      );
      updateLists(newListDelete);
      state.records = newListDelete;
    },
    handleListStatus: (state, { payload }: PayloadAction<string>) => {
      const newListHandleStatus = state.records.map((item) =>
        item._id === payload
          ? {
              ...item,
              status: !item.status,
            }
          : item,
      );
      updateLists(newListHandleStatus);
      state.records = newListHandleStatus;
    },
    addItem: (state, { payload }: PayloadAction<IItemListForm>) => {
      const newListAddItem: IList[] = [];
      let itemAddItem = initialList;
      state.records.map((item) => {
        if (item._id === payload.listId) {
          const listAddItem = item.items.concat([{ ...payload.item }]);
          const newTotalAddItem = getListTotal(listAddItem);
          itemAddItem = {
            ...item,
            total: newTotalAddItem,
            items: listAddItem,
          };
          return newListAddItem.push(itemAddItem);
        } else {
          return newListAddItem.push(item);
        }
      });
      updateLists(newListAddItem);
      state.records = newListAddItem;
      state.selected = itemAddItem;
    },
    editItem: (state, { payload }: PayloadAction<IItemListForm>) => {
      const newListEditItem: IList[] = [];
      let itemEditItem = initialList;
      state.records.map((item) => {
        if (item._id === payload.listId) {
          const listEditItemTemp = item.items.filter(
            (i) => i._id !== payload.item._id,
          );
          const listEditItem = listEditItemTemp.concat([
            { ...payload.item },
          ]);
          const newTotalEditItem = getListTotal(listEditItem);
          itemEditItem = {
            ...item,
            total: newTotalEditItem,
            items: listEditItem,
          };
          return newListEditItem.push(itemEditItem);
        } else {
          return newListEditItem.push(item);
        }
      });
      updateLists(newListEditItem);
      state.records = newListEditItem;
      state.selected = itemEditItem;
    },
    deleteItem: (state, { payload }: PayloadAction<IItemListDelete>) => {
      const newListDeleteItem: IList[] = [];
      let itemDeleteItem = initialList;
      state.records.map((item) => {
        if (item._id === payload.listId) {
          const listDeleteItem = item.items.filter(
            (i) => i._id !== payload.itemId,
          );
          const newTotalDeleteItem = getListTotal(listDeleteItem);
          itemDeleteItem = {
            ...item,
            total: newTotalDeleteItem,
            items: listDeleteItem,
          };
          return newListDeleteItem.push(itemDeleteItem);
        } else {
          return newListDeleteItem.push(item);
        }
      });
      updateLists(newListDeleteItem);
      state.records = newListDeleteItem;
      state.selected = itemDeleteItem;
    },
    deleteItemSelected: (
      state,
      { payload }: PayloadAction<IItemListSelected>,
    ) => {
      const newListDeleteSelectedItem: IList[] = [];
      let itemDeleteSelectedItem = initialList;
      state.records.map((item) => {
        if (item._id === payload.listId) {
          const listDeleteSelectedItem = item.items.filter(
            (i) => !payload.items.includes(i._id),
          );
          const newTotalDeleteSelectedItem = getListTotal(
            listDeleteSelectedItem,
          );
          itemDeleteSelectedItem = {
            ...item,
            total: newTotalDeleteSelectedItem,
            items: listDeleteSelectedItem,
          };
          return newListDeleteSelectedItem.push(itemDeleteSelectedItem);
        } else {
          return newListDeleteSelectedItem.push(item);
        }
      });
      updateLists(newListDeleteSelectedItem);
      state.records = newListDeleteSelectedItem;
      state.selected = itemDeleteSelectedItem;
    },
    handleSelectedItemsStatus: (
      state,
      { payload }: PayloadAction<IItemListSelected>,
    ) => {
      const newListDeleteSelectedItem: IList[] = [];
      let itemDeleteSelectedItem = initialList;
      state.records.map((item) => {
        if (item._id === payload.listId) {
          const listDeleteSelectedItem = item.items.map((item) =>
            payload.items.includes(item._id)
              ? {
                  ...item,
                  status: !item.status,
                }
              : item,
          );
          itemDeleteSelectedItem = {
            ...item,
            items: listDeleteSelectedItem,
          };
          return newListDeleteSelectedItem.push(itemDeleteSelectedItem);
        } else {
          return newListDeleteSelectedItem.push(item);
        }
      });
      updateLists(newListDeleteSelectedItem);
      state.records = newListDeleteSelectedItem;
      state.selected = itemDeleteSelectedItem;
    },
    clearList: (state, { payload }: PayloadAction<string>) => {
      const newListClear: IList[] = [];
      let itemClear = initialList;
      state.records.map((item) => {
        if (item._id === payload) {
          itemClear = {
            ...item,
            total: '0.00',
            items: [],
          };
          return newListClear.push(itemClear);
        }
        return newListClear.push(item);
      });
      updateLists(newListClear);
      state.records = newListClear;
      state.selected = itemClear;
    },
    deleteSelected: (state, { payload }: PayloadAction<string[]>) => {
      const newListDeleteSelected = state.records.filter(
        (item) => !payload.includes(item._id),
      );
      updateLists(newListDeleteSelected);
      state.records = newListDeleteSelected;
    },
    deleteAll: (state) => {
      localStorage.removeItem('SL_M_L');
      state.records = [];
    },
    handleSelectedStatus: (
      state,
      { payload }: PayloadAction<string[]>,
    ) => {
      const newListSelectedHandleStatus = state.records.map((item) =>
        payload.includes(item._id)
          ? {
              ...item,
              status: !item.status,
            }
          : item,
      );
      updateLists(newListSelectedHandleStatus);
      state.records = newListSelectedHandleStatus;
    },
  },
});

export const {
  addList,
  editList,
  getList,
  unselectList,
  deleteList,
  handleListStatus,
  handleSelectedStatus,
  handleSelectedItemsStatus,
  addItem,
  editItem,
  deleteItem,
  deleteItemSelected,
  clearList,
  deleteSelected,
  deleteAll,
} = listsSlice.actions;

export default listsSlice.reducer;
