import { Card } from "@rahulapgm/skyblue-ui";

export function SiteSearchHero() {
  return (
    <header>
      <Card padding="xl">
        <p className="type-overline mb-3 text-(--color-brand-primary)">
          SiteSearch AI
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-(--foreground) sm:text-5xl">
          Turn any website into AI-powered insights
        </h1>
        <p className="type-body mt-4 max-w-2xl text-(--ink-muted)">
          Enter a website URL, ask what you want, or choose a predefined
          workflow to generate SEO metadata, summaries, FAQs and marketing
          copy.
        </p>
      </Card>
    </header>
  );
}
