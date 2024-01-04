import { useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { PageAPI } from './../../types';

export interface usePaginatedListResult<TData> {
  list: TData[];
  isError: boolean | null;
  isLoading: boolean;
  refresh: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<PageAPI<Data>>,
): usePaginatedListResult<Data> {
  const [list, setList] = useState<Data[]>([]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getList(pageParam),
    initialPageParam: 1,
    getNextPageParam: ({ meta }) => (meta?.has_more ? meta.page! + 1 : undefined),
    // enabled: false,
  });

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<Data[]>((prev, curr) => {
        return [...prev, ...curr.data];
      }, []);
      setList(newList);
    }
  }, [query.data]);

  return {
    list,
    isError: query.isError,
    isLoading: query.isLoading,
    refresh: query.refetch,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: !!query.hasNextPage,
  };
}
