import React from "react";

// Components
import { Results } from "../Results/Results";

// Styled-Components
import { NotFound, SearchResultContainer } from "./style";

const SearchResults = ({ searchResults, noResults, clear }) => {
  return (
    <>
      {searchResults.length > 0 && (
        <SearchResultContainer>
          {searchResults.map((result) => (
            <Results key={result.articulo_id} {...result} clear={clear} />
          ))}
        </SearchResultContainer>
      )}
      {noResults && (
        <NotFound>
          <p>No encontré nada con ese nombre</p>
        </NotFound>
      )}
    </>
  );
};

export default SearchResults;
