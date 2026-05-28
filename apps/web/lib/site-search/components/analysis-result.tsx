"use client";

import { Card, Stack } from "@rahulapgm/skyblue-ui";

import { useSiteSearch } from "../site-search-state";

export function AnalysisResult() {
  const { result } = useSiteSearch();

  if (!result) {
    return null;
  }

  return (
    <Card padding="lg">
      <Stack gap="sm">
        <h2 className="type-heading">Result</h2>
        <pre className="max-h-[34rem] overflow-auto whitespace-pre-wrap rounded-xl bg-(--color-bg-dark) p-5 text-sm leading-6 text-(--color-fg-inverse)">
          {result}
        </pre>
      </Stack>
    </Card>
  );
}
