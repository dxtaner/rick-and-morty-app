import React, { useRef, useEffect, useState } from "react";
import { Character } from "../utils/Character";
import { ResultListProps } from "../utils/ResultListProps";
import "./ResultList.css";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const isSelected = (character: Character) => {
    return selectedCharacters.some((char) => char.id === character.id);
  };

  const handleCardClick = (character: Character, index: number) => {
    if (multiSelect) {
      isSelected(character)
        ? setSelectedCharacters((prev) =>
            prev.filter((char) => char.id !== character.id)
          )
        : setSelectedCharacters((prev) => [...prev, character]);
    } else {
      isSelected(character) ? onDeselect(character) : onSelect(character);
    }
    setActiveIndex(index);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    character: Character,
    index: number
  ) => {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      event.preventDefault();
      if (containerRef.current) {
        const children = Array.from(
          containerRef.current.children
        ) as HTMLDivElement[];
        const currentIndex = children.findIndex((child) =>
          child.contains(document.activeElement)
        );

        if (currentIndex !== -1) {
          switch (event.key) {
            case "ArrowUp":
            case "ArrowLeft":
              if (currentIndex > 0) {
                children[currentIndex - 1].focus();
                setActiveIndex(currentIndex - 1);
              }
              break;
            case "ArrowDown":
            case "ArrowRight":
              if (currentIndex < children.length - 1) {
                children[currentIndex + 1].focus();
                setActiveIndex(currentIndex + 1);
              }
              break;
            default:
              break;
          }
        }
      }
    } else if (event.key === "Enter") {
      handleCardClick(character, index);
    }
  };

  return (
    <div className="result-container" ref={containerRef} tabIndex={0}>
      {results.map((character, index) => (
        <div
          key={character.id}
          className={`result-card ${isSelected(character) ? "selected" : ""} ${
            activeIndex === index ? "active" : ""
          }`}
          onClick={() => handleCardClick(character, index)}
          onKeyDown={(e) => handleKeyDown(e, character, index)}
          tabIndex={0}>
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
        </div>
      ))}
    </div>
  );
};

export default ResultList;
