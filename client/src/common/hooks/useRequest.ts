import axios, { AxiosResponse, Method } from 'axios';
import { useState } from 'react';

interface Props<B, R, A> {
  url: (args?: A) => string;
  method: Method;
  body: B;
  onSuccess?: (response: R, args?: A) => void;
}

/**
 * useRequest takes three arguments
 ** B: body - object send to the server
 ** R: response from the server
 ** A: optionsl argument that you want to pass to doRequest fn, when is no argument just use void
 */
export const useRequest = <B, R, A>({
  url,
  method,
  body,
  onSuccess,
}: Props<B, R, A>) => {
  const [error, setError] = useState<string | null>(null);

  const cleanError = () => setError(null);

  /**
   * doRequest fn
   ** optional take one argument than you can get from url fn and onSuccess fn
   ** this is useful e.q when you need to pass id
   */
  const doRequest = async (args?: A): Promise<R | undefined> => {
    try {
      cleanError();

      const response: AxiosResponse<R> = await axios({
        method,
        url: url(args),
        data: body,
      });

      if (onSuccess) onSuccess(response.data, args);

      return response.data;
    } catch (err) {
      setError(
        err.response.data.errors[0].message
          ? err.response.data.errors[0].message
          : 'Sorry! Some error occured!'
      );
    }
  };

  return { doRequest, error, cleanError };
};
