import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

interface Props<T> {
  url: string;
  method: 'get' | 'post' | 'delete' | 'patch';
  body: T;
  onSuccess?: (response: AxiosResponse) => void;
}

export const useRequest = <T>({ url, method, body, onSuccess }: Props<T>) => {
  const [error, setError] = useState<string | null>(null);

  const doRequest = async (props = {}) => {
    try {
      setError(null);
      // @ts-ignore
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) onSuccess(response.data);

      return response.data;
    } catch (err) {
      setError(
        err.response.data.errors[0].message
          ? err.response.data.errors[0].message
          : 'Sorry! Some error occured!'
      );
    }
  };

  return { doRequest, error, setError };
};
