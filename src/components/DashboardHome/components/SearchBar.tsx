import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem; /* espacio para la lupa */
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #c1fd35;
  }
`;

const Icon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: #555;
`;

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Buscar actividad con:", query);
    }
  };

  return (
    <SearchWrapper>
      <Icon />
      <SearchInput
        type="text"
        placeholder="Buscar en tu actividad"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </SearchWrapper>
  );
}
