export interface IOperation {
  a?: number | null;
  b?: number | null;
  c?: number | null;
  x?: number | string | null;
}

export interface IHistoryOperation extends IOperation {
  id: number;
}
