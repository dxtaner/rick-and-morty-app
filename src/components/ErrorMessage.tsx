import React from "react";
import "./ErrorMessage.css";

import { ErrorMessageProps } from "../utils/ErrorMessageProps";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p className="status-message error">{message}</p>;
};

export default ErrorMessage;
