import { Character } from "./Character";

export interface SelectedCharactersProps {
  characters: Character[];
  onRemove: (character: Character) => void;
}
