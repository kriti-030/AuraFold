import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ProductsSearchContext = createContext(null);

export function ProductsSearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [pageActive, setPageActive] = useState(false);

  const registerPage = useCallback(() => {
    setPageActive(true);
    return () => {
      setPageActive(false);
      setExpanded(false);
      setQuery("");
      setSubmittedQuery("");
    };
  }, []);

  const runSearch = useCallback(() => {
    setSubmittedQuery(query.trim());
  }, [query]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setSubmittedQuery("");
  }, []);

  const resetForCategory = useCallback(() => {
    setQuery("");
    setSubmittedQuery("");
    setExpanded(false);
  }, []);

  const value = useMemo(
    () => ({
      pageActive,
      registerPage,
      query,
      setQuery,
      submittedQuery,
      setSubmittedQuery,
      expanded,
      setExpanded,
      runSearch,
      clearSearch,
      resetForCategory,
    }),
    [
      pageActive,
      registerPage,
      query,
      submittedQuery,
      expanded,
      runSearch,
      clearSearch,
      resetForCategory,
    ],
  );

  return (
    <ProductsSearchContext.Provider value={value}>
      {children}
    </ProductsSearchContext.Provider>
  );
}

export function useProductsSearch() {
  const ctx = useContext(ProductsSearchContext);
  if (!ctx) {
    throw new Error("useProductsSearch must be used within ProductsSearchProvider");
  }
  return ctx;
}
