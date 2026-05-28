"use client";

import { Container, Stack } from "@rahulapgm/skyblue-ui";

import { AnalysisComposer } from "./analysis-composer";
import { AnalysisResult } from "./analysis-result";
import { SiteSearchHero } from "./site-search-hero";

export function SiteSearchPage() {
  return (
    <main className="min-h-screen bg-(--color-surface-muted) py-8 text-(--foreground)">
      <Container size="md">
        <Stack gap="lg">
          <SiteSearchHero />
          <AnalysisComposer />
          <AnalysisResult />
        </Stack>
      </Container>
    </main>
  );
}
