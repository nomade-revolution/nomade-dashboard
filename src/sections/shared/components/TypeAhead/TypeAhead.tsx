import { OptionsStructure } from "sections/shared/interfaces/interfaces";
import TypeAheadStyled from "./TypeAheadStyled";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "sections/shared/components/Loader/Loader";
interface TypeAheadProps {
  value: number | null;
  label: string;
  options: OptionsStructure[];
  setValue: (value: number | null) => void;
  getFunctions: (text: string) => void;
  searchText: string;
}

const TypeAhead = ({
  options,
  label,
  setValue,
  getFunctions,
  searchText,
}: TypeAheadProps) => {
  const [search, setSearchTextState] = useState<string>(searchText);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOptions = async () => {
      if (search.length > 2) {
        const timer = setTimeout(async () => {
          setIsLoading(true);
          await getFunctions(search);
          setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
      }
    };

    fetchOptions();
  }, [search]);

  return (
    <TypeAheadStyled>
      <Autocomplete
        className="input"
        onChange={(_event, value) => {
          setValue(value?.id || null);
        }}
        onInputChange={(_event, value) => {
          setSearchTextState(value);
        }}
        isOptionEqualToValue={(
          option: OptionsStructure,
          value: OptionsStructure,
        ) => {
          return option.id === value.id;
        }}
        getOptionKey={(option: OptionsStructure) => option.id}
        getOptionLabel={(option: OptionsStructure) => option.name}
        options={options}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label={label}
              style={{
                minWidth: 200,
                width: "100%",
                maxWidth: 400,
                height: "40px",
              }}
            />
          );
        }}
      />
      <div className="loaderContainer">
        {isLoading && <Loader width="20px" height="20px" />}
      </div>
    </TypeAheadStyled>
  );
};

export default TypeAhead;
