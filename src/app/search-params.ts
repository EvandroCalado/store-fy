import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const coordinatesSearchParams = {
  page: parseAsInteger.withDefault(1),
  query: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
  price: parseAsInteger.withDefault(0),
  rating: parseAsInteger.withDefault(0),
  sort: parseAsString.withDefault('newest'),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);
