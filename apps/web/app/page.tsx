'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';


type AppState = {
  url: string;
  query: string;
  result: string;
  isLoading: boolean;
  error: string;
  setUrl: (value: string) => void;
  setQuery: (value: string) => void;
  runAnalysis: () => Promise<void>;
};

const SiteSearchContext = createContext<AppState | null>(null);

const presetPrompts = [
  {
    label: 'SEO Metadata',
    prompt:
      'Generate SEO metadata for this product page. Return JSON with title, description and keywords.',
  },
  {
    label: 'Product Summary',
    prompt: 'Summarize this product page for a buyer in simple language.',
  },
  {
    label: 'FAQ Generator',
    prompt: 'Generate 5 useful FAQs from this product page.',
  },
  {
    label: 'Affiliate Copy',
    prompt:
      'Generate affiliate marketing copy with headline, key benefits and CTA.',
  },
  {
    label: 'Instagram Ad',
    prompt:
      'Generate Instagram ad copy with hook, caption, CTA and hashtags.',
  },
];

function SiteSearchProvider({ children }: { children: ReactNode }) {
  const [url, setUrl] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function runAnalysis() {
    setError('');
    setResult('');

    if (!url.trim()) {
      setError('Please enter a website URL.');
      return;
    }

    if (!query.trim()) {
      setError('Please enter a query or choose a predefined prompt.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/analyze`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url,
            query,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();

      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  const value = useMemo(
    () => ({
      url,
      query,
      result,
      isLoading,
      error,
      setUrl,
      setQuery,
      runAnalysis,
    }),
    [url, query, result, isLoading, error],
  );

  return (
    <SiteSearchContext.Provider value={value}>
      {children}
    </SiteSearchContext.Provider>
  );
}

function useSiteSearch() {
  const context = useContext(SiteSearchContext);

  if (!context) {
    throw new Error('useSiteSearch must be used inside SiteSearchProvider');
  }

  return context;
}

function SiteSearchPage() {
  const {
    url,
    query,
    result,
    isLoading,
    error,
    setUrl,
    setQuery,
    runAnalysis,
  } = useSiteSearch();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-950">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 rounded-3xl bg-white p-8 shadow-sm">
          <p className="mb-2 text-sm font-medium text-sky-600">
            SiteSearch AI
          </p>

          <h1 className="mb-3 text-4xl font-bold tracking-tight">
            Turn any website into AI-powered insights
          </h1>

          <p className="max-w-2xl text-slate-600">
            Enter a website URL, ask what you want, or choose a predefined
            workflow to generate SEO metadata, summaries, FAQs and marketing
            copy.
          </p>
        </header>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">
              Website URL
            </label>
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://www.apple.com/in/iphone-17/"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">
              What do you want to generate?
            </label>
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Example: Generate SEO metadata for this product page"
              rows={5}
              className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
            />
          </div>

          <div className="mb-6">
            <p className="mb-3 text-sm font-medium">Predefined prompts</p>

            <div className="flex flex-wrap gap-3">
              {presetPrompts.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setQuery(item.prompt)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:border-sky-500 hover:text-sky-600"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {error ? (
            <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={runAnalysis}
            disabled={isLoading}
            className="rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </section>

        {result ? (
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Result</h2>

            <pre className="whitespace-pre-wrap rounded-2xl bg-slate-950 p-5 text-sm text-slate-50">
              {result}
            </pre>
          </section>
        ) : null}
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <SiteSearchProvider>
      <SiteSearchPage />
    </SiteSearchProvider>
  );
}
