import {
  DoneAll,
  Home,
  PostAdd,
  RequestPage,
  Settings,
  StackedBarChart,
  ViewList,
  AddShoppingCart,
  Dashboard,
  DeleteForever,
} from '@mui/icons-material';
import { IIconsProps } from '../../types';

export const Icons = ({ icon }: IIconsProps) => {
  switch (icon) {
    case 'add':
      return <AddShoppingCart />;
    case 'chart':
      return <StackedBarChart />;
    case 'data':
      return <ViewList />;
    case 'delete':
      return <DeleteForever />;
    case 'doneAll':
      return <DoneAll />;
    case 'dashboard':
      return <Dashboard />;
    case 'home':
      return <Home />;
    case 'request':
      return <RequestPage />;
    case 'postAdd':
      return <PostAdd />;
    default:
      return <Settings />;
  }
};
