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

interface PaginatedListOption {
  /**
   * Set this to `false` to disable automatic refetching when the query mounts or changes query keys.
   */
  enabled?: boolean;
  /**
   * The time in milliseconds after data is considered stale.
   */
  staleTime?: number;
}

export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<PageAPI<Data>>,
  options?: PaginatedListOption,
): usePaginatedListResult<Data> {
  const [list, setList] = useState<Data[]>([]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => getList(pageParam),
    initialPageParam: 1,
    getNextPageParam: ({ meta }) => (meta?.has_more ? meta.page! + 1 : undefined),
    enabled: options?.enabled,
    staleTime: options?.staleTime,
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
