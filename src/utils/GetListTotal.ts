import { IItemList } from '../types';

export const getListTotal = (list: IItemList[]) => {
  let valueReturn = 0;
  list.map((item) => (valueReturn = valueReturn + Number(item.total)));
  return valueReturn.toLocaleString('en-us', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: 'BRL',
  });
};
