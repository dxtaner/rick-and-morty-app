import React, { useRef, useEffect } from "react";
import { Character } from "../utils/Character";
import "./SelectedCharacters.css";

interface SelectedCharactersProps {
  characters: Character[];
  onRemove: (character: Character) => void;
}

const SelectedCharacters: React.FC<SelectedCharactersProps> = ({
  characters,
  onRemove,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    character: Character
  ) => {
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      event.preventDefault();
      const index = characters.findIndex((c) => c.id === character.id);

      if (index !== -1) {
        if (
          (event.key === "ArrowUp" || event.key === "ArrowLeft") &&
          index > 0
        ) {
          (
            containerRef.current?.children[index - 1] as HTMLDivElement
          )?.focus();
        } else if (
          (event.key === "ArrowDown" || event.key === "ArrowRight") &&
          index < characters.length - 1
        ) {
          (
            containerRef.current?.children[index + 1] as HTMLDivElement
          )?.focus();
        }
      }
    } else if (event.key === "Enter") {
      onRemove(character);
    }
  };

  if (characters.length === 0) {
    return null;
  }

  return (
    <div className="selected-characters" ref={containerRef} tabIndex={0}>
      {characters.map((character) => (
        <div
          key={character.id}
          className="selected-character"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, character)}>
          <span>{character.name}</span>
          <button onClick={() => onRemove(character)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default SelectedCharacters;
