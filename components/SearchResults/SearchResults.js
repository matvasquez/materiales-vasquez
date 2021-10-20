import React, { useEffect } from "react";
import Link from "next/link";

// Components
import { Results } from "../Results/Results";

// Styled-Components
import {
  NotFound,
  Container,
  SearchResultContainer,
  LoadMoreButton,
} from "./style";

const SearchResults = ({
  searchResults,
  noResults,
  text,
  clear,
  searchName,
}) => {
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (searchResults.length === 8) {
        clear();
        window.location.href = `${window.location.origin}/todos-los/${searchName}`;
      } else {
        alert("No hay suficientes artículos para verlos en una página nueva ");
      }
    }
  };
  useEffect(() => {
    if (searchResults.length > 0) {
      window.addEventListener("keypress", (e) => handleEnter(e));
    }
    return () => {
      window.removeEventListener("keypress", (e) => handleEnter(e));
    };
  }, [searchResults, searchName]);

  return (
    <>
      {searchResults.length > 0 && (
        <Container>
          <SearchResultContainer>
            {searchResults.map((result) => (
              <Results key={result.articulo_id} {...result} clear={clear} />
            ))}
            {searchName !== "" && (
              <>
                {searchResults.length === 8 && (
                  <LoadMoreButton onClick={() => clear([])}>
                    <Link href={`/todos-los/${searchName}`}>
                      <a>Ver más</a>
                    </Link>
                  </LoadMoreButton>
                )}
              </>
            )}
          </SearchResultContainer>
        </Container>
      )}
      {noResults && (
        <NotFound>
          <p>{text}</p>
        </NotFound>
      )}
    </>
  );
};

export default SearchResults;
