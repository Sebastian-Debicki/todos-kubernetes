export interface ErrorResponse {
  response: {
    data: {
      errors: { message: string }[];
    };
  };
}
