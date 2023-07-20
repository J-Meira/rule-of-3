import ListsReducer from './ListsReducer';
import SystemReducer from './SystemReducer';

export * from './ListsReducer';
export * from './SystemReducer';

export const reducers = {
  lists: ListsReducer,
  system: SystemReducer,
};
