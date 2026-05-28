"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import type { SiteSearchContextValue, SiteSearchState } from "./types";

type SiteSearchAction =
  | { type: "set-url"; value: string }
  | { type: "set-query"; value: string }
  | { type: "analysis-started" }
  | { type: "analysis-succeeded"; result: string }
  | { type: "analysis-failed"; error: string };

const initialState: SiteSearchState = {
  url: "",
  query: "",
  result: "",
  isLoading: false,
  error: "",
};

const SiteSearchContext = createContext<SiteSearchContextValue | null>(null);

function reducer(
  state: SiteSearchState,
  action: SiteSearchAction,
): SiteSearchState {
  switch (action.type) {
    case "set-url":
      return { ...state, url: action.value };
    case "set-query":
      return { ...state, query: action.value };
    case "analysis-started":
      return { ...state, error: "", result: "", isLoading: true };
    case "analysis-succeeded":
      return { ...state, result: action.result, isLoading: false };
    case "analysis-failed":
      return { ...state, error: action.error, isLoading: false };
  }
}

function getValidationError({ url, query }: SiteSearchState) {
  if (!url.trim()) {
    return "Please enter a website URL.";
  }

  if (!query.trim()) {
    return "Please enter a query or choose a predefined prompt.";
  }

  return "";
}

export function SiteSearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUrl = useCallback((value: string) => {
    dispatch({ type: "set-url", value });
  }, []);

  const setQuery = useCallback((value: string) => {
    dispatch({ type: "set-query", value });
  }, []);

  const runAnalysis = useCallback(async () => {
    const validationError = getValidationError(state);

    if (validationError) {
      dispatch({ type: "analysis-failed", error: validationError });
      return;
    }

    dispatch({ type: "analysis-started" });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: state.url,
            query: state.query,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.");
      }

      const data = (await response.json()) as { result?: string };

      dispatch({
        type: "analysis-succeeded",
        result: data.result ?? "",
      });
    } catch (err) {
      dispatch({
        type: "analysis-failed",
        error: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }, [state]);

  const value = useMemo<SiteSearchContextValue>(
    () => ({
      ...state,
      setUrl,
      setQuery,
      selectPrompt: setQuery,
      runAnalysis,
    }),
    [runAnalysis, setQuery, setUrl, state],
  );

  return (
    <SiteSearchContext.Provider value={value}>
      {children}
    </SiteSearchContext.Provider>
  );
}

export function useSiteSearch() {
  const context = useContext(SiteSearchContext);

  if (!context) {
    throw new Error("useSiteSearch must be used inside SiteSearchProvider");
  }

  return context;
}
