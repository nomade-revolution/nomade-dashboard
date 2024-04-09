import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SearchBarStyled from "./SearchBarStyled";

interface SearchBarProps {
  pageName: string;
  pageTypes: string;
  searchText: string;
  setSearchText: (value: string | null) => void;
  onSearchSubmit: () => void;
  setFilters?: (value: null) => void;
}

const SearchBar = ({
  pageName,
  pageTypes,
  searchText,
  setSearchText,
  onSearchSubmit,
  setFilters,
}: SearchBarProps): React.ReactElement => {
  const navigate = useNavigate();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.value === null && navigate(`/${pageName}/page/1`);
    setSearchText(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchText === null) {
      return;
    }

    onSearchSubmit();
  };

  const handleClear = () => {
    setSearchText(null);
    setFilters!(null);

    navigate(`/${pageName}/page/1`);
  };

  const isButtonDisabled = searchText === "" || searchText === null;

  return (
    <SearchBarStyled action="" className="search" onSubmit={handleSubmit}>
      <div className="search__fieldContainer">
        <input
          type="text"
          className="search__field"
          placeholder={` Buscar ${pageTypes}`}
          onChange={handleChange}
          value={searchText}
        />
        {searchText && (
          <button
            className="search__closeButton"
            type="button"
            onClick={handleClear}
            aria-label="Borrar texto"
          >
            <MdClose />
          </button>
        )}
      </div>
      <button
        className="search__button"
        type="submit"
        disabled={isButtonDisabled}
        aria-label={`Buscar ${pageName}`}
      >
        <FaSearch />
        <span className="search__button-text">Buscar</span>
      </button>
    </SearchBarStyled>
  );
};

export default SearchBar;
