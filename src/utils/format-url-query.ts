import qs from 'query-string';

type formatUrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export const formatUrlQuery = ({
  params,
  key,
  value,
}: formatUrlQueryParams) => {
  const query = qs.parse(params);

  query[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query,
    },
    { skipNull: true },
  );
};
