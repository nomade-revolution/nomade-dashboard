import { OptionsStructure } from "sections/shared/interfaces/interfaces";
import TypeAheadStyled from "./TypeAheadStyled";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Loader from "sections/shared/components/Loader/Loader";

const SEARCH_DEBOUNCE_MS = 400;

interface TypeAheadProps {
  value: number | null;
  label: string;
  options: OptionsStructure[];
  setValue: (value: number | null) => void;
  getFunctions: (text: string) => void;
  searchText: string;
  loading?: boolean;
  serverSideFilter?: boolean;
  onSearchChange?: (text: string) => void;
}

const TypeAhead = ({
  options,
  label,
  setValue,
  getFunctions,
  searchText,
  loading,
  serverSideFilter = false,
  onSearchChange,
}: TypeAheadProps) => {
  const [search, setSearchTextState] = useState<string>(searchText);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getFunctionsRef = useRef(getFunctions);
  const onSearchChangeRef = useRef(onSearchChange);
  const lastNotifiedSearchRef = useRef(searchText);
  const parentControlsLoading = loading !== undefined;
  const parentControlsLoadingRef = useRef(parentControlsLoading);

  getFunctionsRef.current = getFunctions;
  onSearchChangeRef.current = onSearchChange;
  parentControlsLoadingRef.current = parentControlsLoading;

  useEffect(() => {
    if (search.length <= 2) {
      if (!parentControlsLoadingRef.current) {
        setIsLoading(false);
      }
      return;
    }

    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      if (parentControlsLoadingRef.current) {
        getFunctionsRef.current(search);
        return;
      }
      setIsLoading(true);
      void Promise.resolve(getFunctionsRef.current(search))
        .catch(() => undefined)
        .finally(() => {
          if (cancelled) return;
          setIsLoading(false);
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search]);

  const showLoading = loading ?? isLoading;

  return (
    <TypeAheadStyled>
      <Autocomplete
        className="input"
        loading={showLoading}
        filterOptions={serverSideFilter ? (items) => items : undefined}
        onChange={(_event, value) => {
          setValue(value?.id || null);
        }}
        onInputChange={(_event, value, reason) => {
          if (reason === "reset") return;
          setSearchTextState(value);
          if (lastNotifiedSearchRef.current === value) return;
          lastNotifiedSearchRef.current = value;
          onSearchChangeRef.current?.(value);
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
        {showLoading && <Loader width="20px" height="20px" />}
      </div>
    </TypeAheadStyled>
  );
};

export default TypeAhead;
