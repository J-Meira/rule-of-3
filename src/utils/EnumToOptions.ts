import { EnumObjectProps } from '@j-meira/mui-theme';

export const enumToList = (obj: EnumObjectProps) => {
  return Object.entries(obj).map(([key, value]) => ({
    value: Number(key),
    label: value,
  }));
};
