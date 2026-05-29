"use client";

import { Container, Stack } from "@rahulapgm/skyblue-ui";

import { AnalysisComposer } from "./analysis-composer";
import { AnalysisResult } from "./analysis-result";
import { SiteSearchHero } from "./site-search-hero";
import { useEffect } from "react";

export function SiteSearchPage() {

  useEffect(() => {
    fetch("https://sitesearch-ai.onrender.com")
      .catch(() => {
        // ignore errors
      });
  }, []);

  return (
    <main className="min-h-screen bg-(--color-surface-muted) py-8 text-(--foreground)">
      <Container size="xl">
        <Stack gap="lg">
          <SiteSearchHero />
          <AnalysisComposer />
          <AnalysisResult />
        </Stack>
      </Container>
    </main>
  );
}
