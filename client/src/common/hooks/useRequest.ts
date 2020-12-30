import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

interface Props<B, R> {
  url: string;
  method: 'get' | 'post' | 'delete' | 'patch';
  body: B;
  onSuccess?: (response: R) => void;
}

export const useRequest = <B, R>({
  url,
  method,
  body,
  onSuccess,
}: Props<B, R>) => {
  const [error, setError] = useState<string | null>(null);

  const doRequest = async (): Promise<R | undefined> => {
    try {
      setError(null);

      const response: AxiosResponse<R> = await axios({
        method,
        url,
        data: body,
      });

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
