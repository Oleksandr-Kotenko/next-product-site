import { NextRequest, NextResponse } from 'next/server';
import { ProductListPageOptions, ProductListResponse } from '@type/products';
import { getProductsList } from '@utils/products';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageNumber = Number(searchParams.get('pageNumber'));
  const limit = Number(searchParams.get('limit'));

  const pageOptions: ProductListPageOptions = {
    pageNumber: pageNumber && Number.isInteger(pageNumber) ? pageNumber : 1,
    limit: limit && Number.isInteger(limit) ? limit : 20,
  };

  const result: ProductListResponse = getProductsList(pageOptions);

  return NextResponse.json(result);
}
