import { EnumObjectProps, SelectOptionsProps } from '@j-meira/mui-theme';

export const enumToList = (obj: EnumObjectProps) => {
  const valueReturn: SelectOptionsProps[] = [];
  for (const [key, value] of Object.entries(obj)) {
    valueReturn.push({
      value: Number(key),
      label: value,
    });
  }
  return valueReturn;
};
