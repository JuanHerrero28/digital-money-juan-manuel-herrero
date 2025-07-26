import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const SearchWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
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

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  return (
    <SearchWrapper>
      <Icon />
      <SearchInput
        type="text"
        placeholder="Buscar en tu actividad"
        onChange={(e) => onSearch(e.target.value)}
      />
    </SearchWrapper>
  );
}

