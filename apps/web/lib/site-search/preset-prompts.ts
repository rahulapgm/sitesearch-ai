import type { PresetPrompt } from "./types";

export const presetPrompts: PresetPrompt[] = [
  {
    label: "SEO Metadata",
    prompt:
      "Generate SEO metadata for this product page. Return JSON with title, description and keywords.",
  },
  {
    label: "Product Summary",
    prompt: "Summarize this product page for a buyer in simple language.",
  },
  {
    label: "FAQ Generator",
    prompt: "Generate 5 useful FAQs from this product page.",
  },
  {
    label: "Affiliate Copy",
    prompt:
      "Generate affiliate marketing copy with headline, key benefits and CTA.",
  },
  {
    label: "Instagram Ad",
    prompt:
      "Generate Instagram ad copy with hook, caption, CTA and hashtags.",
  },
];
