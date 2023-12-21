import React from "react";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p className="status-message error">{message}</p>;
};

export default ErrorMessage;
