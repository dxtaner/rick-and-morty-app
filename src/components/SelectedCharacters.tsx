import React from "react";
import { Character } from "./Character";
import "./SelectedCharacters.css";

interface SelectedCharactersProps {
  characters: Character[];
  onRemove: (character: Character) => void;
}

const SelectedCharacters: React.FC<SelectedCharactersProps> = ({
  characters,
  onRemove,
}) => {
  return (
    <div className="selected-characters">
      {characters.map((character) => (
        <div key={character.id} className="selected-character">
          <span>{character.name}</span>
          <button onClick={() => onRemove(character)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default SelectedCharacters;
