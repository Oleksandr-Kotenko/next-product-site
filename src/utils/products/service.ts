import { cache } from 'react';
import { ProductListPageOptions, ProductListQueryData } from '@type/products';
import { getDbCLient } from '@utils/dbCLient';
import type { PrismaClient } from '@prisma/client';

export async function getProductById(id: string) {
  const dbCLient: PrismaClient = await getDbCLient();
  const product = await dbCLient.product.findUnique({
    where: {
      id,
    },
  });
  return product;
}

export async function getProductsList(pageOptions: ProductListPageOptions, filterOptions: ProductListQueryData) {
  const { page, limit = 20 } = pageOptions;
  const { category, search } = filterOptions;
  const offset = (page - 1) * limit;
  console.log(`${offset} : ${limit}`);

  const where = {
    ...(search && { name: { startsWith: search } }),
    ...(category && { category }),
  };

  const dbCLient: PrismaClient = await getDbCLient();
  const data = await dbCLient.product.findMany({
    take: limit,
    skip: offset,
    where,
  });

  const count = await dbCLient.product.count({ where });

  return {
    data,
    pagination: {
      totalCount: count,
      pageCount: Math.ceil(count / limit),
      page,
    },
  };
}

export const getProductFromStore = cache(async (id: string) => {
  const product = await getProductById(id);
  return product;
});
