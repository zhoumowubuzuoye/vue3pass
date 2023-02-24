export type pageValue<T> = {
  pageTotal: number;
  total: number;
  rows: T[];
};

export type PageParams = {
  current: number;
  pageSize: number;
  [key: string]: any;
};
