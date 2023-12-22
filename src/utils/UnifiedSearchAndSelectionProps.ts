import { Character } from "./Character";

export interface UnifiedSearchAndSelectionProps {
  onSearch: (query: string) => void;
  selectedCharacters: Character[];
  onDeselect: (character: Character) => void;
}
