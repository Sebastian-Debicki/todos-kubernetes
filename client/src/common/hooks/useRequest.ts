import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

interface Props<T> {
  url: string;
  method: 'get' | 'post' | 'delete' | 'patch';
  body: T;
  onSuccess?: (response: AxiosResponse) => void;
}

export const useRequest = <T>({ url, method, body, onSuccess }: Props<T>) => {
  const [errors, setErrors] = useState<[{ message: string }] | null>(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      // @ts-ignore
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) onSuccess(response.data);

      return response.data;
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors };
};
