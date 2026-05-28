"use client";

import { Chip } from "@rahulapgm/skyblue-ui/chip";

import { presetPrompts } from "../preset-prompts";
import { useSiteSearch } from "../site-search-state";

export function PresetPromptList() {
  const { query, selectPrompt } = useSiteSearch();

  return (
    <section aria-labelledby="preset-prompts-heading">
      <p id="preset-prompts-heading" className="type-title mb-3">
        Predefined prompts
      </p>
      <div className="flex flex-wrap gap-3">
        {presetPrompts.map((item) => (
          <Chip
            key={item.label}
            onClick={() => selectPrompt(item.prompt)}
            variant={query === item.prompt ? "brand" : "neutral"}
          >
            {item.label}
          </Chip>
        ))}
      </div>
    </section>
  );
}
