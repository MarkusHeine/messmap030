import React from "react";
// import { ValidationError } from "../models/ValidationError";

type Props = {
  error: any;
};

const ValidationErrorMessage: React.FC<Props> = props => {
  const { error } = props;

  return (
    <div>
      {error &&
        error.error &&
        error.errorMessage &&
        error.errorMessage.map((msg: string, index: number) => (
          <p key={index} className="text-danger m-0">
            {msg}
          </p>
        ))}
    </div>
  );
};

export default ValidationErrorMessage;
