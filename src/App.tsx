import React, { useState } from "react";
import "./App.css";

import ResultList from "./components/ResultList";
import Footer from "./components/Footer";
import LoadingMessage from "./components/LoadingMessage";
import ErrorMessage from "./components/ErrorMessage";
import Header from "./components/Header";

import { fetchCharactersByName } from "./api";
import { Character } from "./utils/Character";
import UnifiedSearchAndSelection from "./components/UnifiedSearchAndSelection";

const App: React.FC = () => {
  const [results, setResults] = useState<Character[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  const handleSearch = async (newQuery: string) => {
    setLoading(true);
    setError(null);
    setQuery(newQuery);

    setResults([]);

    try {
      const results = await fetchCharactersByName(newQuery);
      setResults(results);
    } catch (err) {
      setError("There is nothing here");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (character: Character) => {
    setSelectedCharacters((prev) => [...prev, character]);
  };

  const handleDeselect = (character: Character) => {
    setSelectedCharacters((prev) =>
      prev.filter((char) => char.id !== character.id)
    );
  };

  return (
    <div className="App" tabIndex={0}>
      <Header />

      <UnifiedSearchAndSelection
        onSearch={handleSearch}
        selectedCharacters={selectedCharacters}
        onDeselect={handleDeselect}
      />

      {loading && <LoadingMessage />}
      {error && <ErrorMessage message={error} />}

      <ResultList
        results={results}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        query={query}
        selectedCharacters={selectedCharacters}
        setSelectedCharacters={setSelectedCharacters}
      />

      <Footer />
    </div>
  );
};

export default App;
