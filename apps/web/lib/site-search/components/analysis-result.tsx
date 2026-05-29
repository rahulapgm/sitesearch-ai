"use client";

import { useEffect, useRef } from "react";
import { Card, Stack } from "@rahulapgm/skyblue-ui";

import { useSiteSearch } from "../site-search-state";

export function AnalysisResult() {
  const { result } = useSiteSearch();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!result) {
      return;
    }

    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [result]);

  if (!result) {
    return null;
  }

  return (
    <div ref={resultRef}>
      <Card padding="lg">
        <Stack gap="sm">
          <h2 className="type-heading">Result</h2>

          <pre className="max-h-[34rem] overflow-auto whitespace-pre-wrap rounded-xl bg-(--color-bg-dark) p-5 text-sm leading-6 text-(--color-fg-inverse)">
            {result}
          </pre>
        </Stack>
      </Card>
    </div>
  );
}