/**
 * Constructs a URLSearchParams object based on the given query data and returns it.
 *
 * @param {Record<string, any>} queryData - The query data used to construct the URLSearchParams object.
 * @returns {URLSearchParams} - The constructed URLSearchParams object.
 */
export const buildQueryParams = (queryData: Record<string, any>): URLSearchParams => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(queryData)) {
    params.append(key, encodeURIComponent(value.toString()));
  }

  return params;
};
