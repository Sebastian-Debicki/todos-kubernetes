import { ErrorResponse } from '../models';

export const handleError = (err: ErrorResponse): string => {
  if (err.response.data.errors[0].message) {
    return err.response.data.errors[0].message;
  } else {
    return 'Sorry! Some error occured.';
  }
};
