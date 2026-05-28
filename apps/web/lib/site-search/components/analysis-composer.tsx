"use client";

import {
  Button,
  Card,
  Input,
  Loader,
  MessageBox,
  Stack,
  Textarea,
} from "@rahulapgm/skyblue-ui";

import { PresetPromptList } from "./preset-prompt-list";
import { useSiteSearch } from "../site-search-state";

export function AnalysisComposer() {
  const { url, query, isLoading, error, setUrl, setQuery, runAnalysis } =
    useSiteSearch();

  return (
    <Card padding="lg">
      <Stack gap="md">
        <Input
          label="Website URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://www.apple.com/in/iphone-17/"
        />

        <Textarea
          label="What do you want to generate?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Example: Generate SEO metadata for this product page"
          rows={5}
          className="resize-none"
        />

        <PresetPromptList />

        {error ? (
          <MessageBox tone="error" title="Analysis not started" description={error} />
        ) : null}

        <div>
          <Button onClick={runAnalysis} disabled={isLoading}>
            {isLoading ? (
              <Loader label="Analyzing" size="sm" tone="inverse" />
            ) : (
              "Run Analysis"
            )}
          </Button>
        </div>
      </Stack>
    </Card>
  );
}
