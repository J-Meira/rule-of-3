import { RouteProps } from 'react-router-dom';

export type IRoutesProps = Omit<RouteProps, 'children'> & {
  name: string;
  children?: IRoutesProps[];
};
