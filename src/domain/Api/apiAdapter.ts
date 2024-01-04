import { MetaDataPage, MetaDataPageAPI } from '../types';

function toMetaDataPage(meta: MetaDataPageAPI): MetaDataPage {
  return {
    total: meta.total!,
    perPage: meta.per_page!,
    currentPage: meta.page!,
    lastPage: meta.total_pages!,
    firstPage: meta.next_page!,
    hasNextPage: meta.has_more!,
    hasPreviousPage: meta.page! > 1,
  };
}

export const apiAdapter = {
  toMetaDataPage,
};
