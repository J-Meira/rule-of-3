import OperationsReducer from './OperationsReducer';
import SystemReducer from './SystemReducer';

export * from './OperationsReducer';
export * from './SystemReducer';

export const reducers = {
  operations: OperationsReducer,
  system: SystemReducer,
};
