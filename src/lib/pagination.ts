const PAGE_LIMIT = 999;

export function getPageNumber(value: string | null) {
  const page = Number(value);

  if (!Number.isInteger(page)) return 1;
  if (page >= PAGE_LIMIT || page < 1) return 1;
  return page;
}
