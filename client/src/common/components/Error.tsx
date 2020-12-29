import React from 'react';

interface Props {
  errors: [{ message: string }];
}

export const Error: React.FC<Props> = ({ errors }) => (
  <div>
    <div className="alert alert-danger">
      <h4>Ooops....</h4>
      <ul className="my-0">
        {errors.map((err) => (
          <li key={err.message}>{err.message}</li>
        ))}
      </ul>
    </div>
  </div>
);
