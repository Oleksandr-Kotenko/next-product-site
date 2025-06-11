import { ReactNode, useCallback, useEffect, useState } from 'react';
import FilterContext from './filter.context';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { removeEmptyProperties } from '@utils/removeEmptyProperties';

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<{
    category: string;
    search: string;
    page: number;
  }>({
    category: categoryFilter,
    search: searchFilter,
    page: currentPage,
  });

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const updateRouter = () => {
    const query = {
      categoryFilter,
      searchFilter,
      page: currentPage.toString(),
    };

    const cleanerQuery = removeEmptyProperties(query);
    const params = new URLSearchParams(cleanerQuery).toString();

    router.push(pathName + `?${params}`);
  };

  useEffect(() => {
    const category = searchParams!.get('categoryFilter');
    const search = searchParams!.get('searchFilter');
    const page = searchParams!.get('page');

    if (category) setCategoryFilter(category!);
    if (search) setSearchFilter(search!);
    if (currentPage) setCurrentPage(Number(page));
  }, [currentPage, searchParams]);

  const applyFilters = useCallback(() => {
    setFilters({
      category: categoryFilter,
      search: searchFilter,
      page: currentPage,
    });
    updateRouter();
  }, [categoryFilter, currentPage, searchFilter]);

  useEffect(() => {
    applyFilters();
  }, [currentPage, applyFilters]);

  return (
    <FilterContext.Provider
      value={{
        categoryFilter,
        setCategoryFilter,
        searchFilter,
        setSearchFilter,
        currentPage,
        setCurrentPage,
        applyFilters,
        filters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
