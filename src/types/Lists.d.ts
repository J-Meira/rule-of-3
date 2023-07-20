export interface IItemList {
  _id: string;
  description: string;
  quantity?: number;
  unityPrice?: string;
  total?: string;
  status: boolean;
}

export interface IListEdit {
  _id: string;
  name: string;
}
export interface IItemListForm {
  listId: string;
  item: IItemList;
}

export interface IItemListDelete {
  listId: string;
  itemId: string;
}
export interface IItemListSelected {
  listId: string;
  items: string[];
}

export interface IList {
  _id: string;
  name: string;
  items: IItemList[];
  total: string;
  status: boolean;
}
