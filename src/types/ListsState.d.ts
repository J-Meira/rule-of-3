import { IList } from './Lists';

export interface IListsState {
  records: IList[];
  selected?: IList | null;
}
