export type PresetPrompt = {
  label: string;
  prompt: string;
};

export type SiteSearchState = {
  url: string;
  query: string;
  result: string;
  isLoading: boolean;
  error: string;
};

export type SiteSearchContextValue = SiteSearchState & {
  setUrl: (value: string) => void;
  setQuery: (value: string) => void;
  selectPrompt: (prompt: string) => void;
  runAnalysis: () => Promise<void>;
};
