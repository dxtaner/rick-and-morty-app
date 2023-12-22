import React from "react";
import SearchBox from "./SearchBox";
import SelectedCharacters from "./SelectedCharacters";
import { Character } from "../utils/Character";
import "./UnifiedSearchAndSelection.css";

interface UnifiedSearchAndSelectionProps {
  onSearch: (query: string) => void;
  selectedCharacters: Character[];
  onDeselect: (character: Character) => void;
}

const UnifiedSearchAndSelection: React.FC<UnifiedSearchAndSelectionProps> = ({
  onSearch,
  selectedCharacters,
  onDeselect,
}) => {
  const isEmptySelection = selectedCharacters.length === 0;

  return (
    <div className="unified-container">
      {isEmptySelection ? (
        <div className="characters-section empty">No characters selected.</div>
      ) : (
        <div className="characters-section">
          <SelectedCharacters
            characters={selectedCharacters}
            onRemove={onDeselect}
          />
        </div>
      )}
      <div className="search-section">
        <SearchBox onSearch={onSearch} />
      </div>
    </div>
  );
};

export default UnifiedSearchAndSelection;
