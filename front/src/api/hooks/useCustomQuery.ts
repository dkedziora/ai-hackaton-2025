import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";

type CustomQueryType<T, V> = UndefinedInitialDataOptions<T> &
  Partial<{
    onError: (error: AxiosError<V>) => void;
    onSuccess: (data: T) => void;
    onSettled: () => void;
  }>;

const useCustomQuery = <T, V>({
  onError,
  onSettled,
  onSuccess,
  ...options
}: CustomQueryType<T, V>) => {
  const query = useQuery<T>({ ...options });

  useEffect(() => {
    if (query.isError && axios.isAxiosError(query.error) && onError)
      onError(query.error);
  }, [query.isError, query.error]);

  useEffect(() => {
    if (query.isSuccess && query.data && onSuccess) onSuccess(query.data);
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if ((query.isFetched || query.isSuccess || query.isError) && onSettled)
      onSettled();
  }, [query.isFetched, query.isSuccess, query.isError, query.isRefetching]);

  return query;
};

export default useCustomQuery;
