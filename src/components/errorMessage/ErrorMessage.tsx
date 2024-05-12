import React from "react";

type errorMessageProps = {
  children: React.ReactNode;
};

const ErrorMessage: React.FC<errorMessageProps> = ({ children }) => {
  return (
    <div>
      <p>{children}</p>
    </div>
  );
};

export default ErrorMessage;
