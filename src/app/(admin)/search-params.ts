import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const coordinatesSearchParams = {
  page: parseAsInteger.withDefault(1),
  query: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);
