import { Product, ProductListPageOptions } from '@type/products';

import productsSmallData from '../../mock/small/products.json';
import productsLargeData from '../../mock/large/products.json';

let products: Product[] = [...productsSmallData, ...productsLargeData];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductsList(pageOptions: ProductListPageOptions) {
  const { pageNumber, limit } = pageOptions;
  const offset = (pageNumber - 1) * limit;
  console.log(`${offset} : ${limit}`);
  const data = products.slice(offset, offset + limit);
  return {
    data,
    count: products.length,
  };
}
