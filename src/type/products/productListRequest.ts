export type ProductListPageOptions = {
  page: number;
  limit?: number;
};

export type ProductListQueryData = {
  category?: string;
  search?: string;
};

export type ProductQueryParams = ProductListQueryData & ProductListPageOptions;
