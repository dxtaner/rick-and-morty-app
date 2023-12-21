import React, { useState, useEffect } from "react";
import "./ResultList.css";
import { Character } from "./Character";

interface ResultListProps {
  results: Character[];
  onSelect: (character: Character) => void;
  onDeselect: (character: Character) => void;
  query: string;
  selectedCharacters: Character[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  multiSelect?: boolean;
}

const highlightQuery = (text: string, query: string): JSX.Element => {
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? <strong key={index}>{part}</strong> : part
      )}
    </span>
  );
};

const ResultList: React.FC<ResultListProps> = ({
  results,
  onSelect,
  onDeselect,
  query,
  selectedCharacters,
  setSelectedCharacters,
  multiSelect = false,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setActiveIndex(null);
  }, [results]);

  const isSelected = (character: Character) => {
    return selectedCharacters.some((char) => char.id === character.id);
  };

  const handleCardClick = (character: Character) => {
    if (multiSelect) {
      isSelected(character)
        ? setSelectedCharacters((prev) =>
            prev.filter((char) => char.id !== character.id)
          )
        : setSelectedCharacters((prev) => [...prev, character]);
    } else {
      isSelected(character) ? onDeselect(character) : onSelect(character);
    }
  };

  return (
    <ul className="result-container">
      {results.map((character, index) => (
        <li
          key={character.id}
          className={`result-card ${isSelected(character) ? "selected" : ""} ${
            activeIndex === index ? "active" : ""
          }`}
          onClick={() => handleCardClick(character)}>
          <img
            src={character.image}
            alt={character.name}
            className="character-image"
          />
          <strong className="character-name">
            {highlightQuery(character.name, query)}
          </strong>
          <div className="episode-info">
            Episodes: {character.episode.length}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ResultList;
