import { Character } from "../utils/Character";

export interface ResultListProps {
  results: Character[];
  onSelect: (character: Character) => void;
  onDeselect: (character: Character) => void;
  query: string;
  selectedCharacters: Character[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  multiSelect?: boolean;
}
