import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import "./SearchBox.css";
import { SearchBoxProps } from "../utils/SearchBoxProps";

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      onSearch(inputRef.current.value);
    }
  };

  return (
    <div className="search-box-container">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search the character..."
        />
        <button type="button" onClick={handleButtonClick}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
