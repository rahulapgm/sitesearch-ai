import { Card } from "@rahulapgm/skyblue-ui";
import { Chip } from "@rahulapgm/skyblue-ui/src/chip";

export function SiteSearchHero() {
  return (
    <header>
      <Card padding="xl">
        <p className="type-overline mb-3 text-(--color-brand-primary)">
          SiteSearch AI
        </p>
        <h1 className="max-w-5xl text-4xl font-extrabold leading-tight text-(--foreground) sm:text-5xl">
          Turn any website into AI-powered insights
        </h1>
        <p className="type-body mt-1 max-w-5xl text-(--ink-muted)">
          Enter a website URL, ask what you want, or choose a predefined workflow to generate SEO metadata, summaries, FAQs and marketing
          copy.
        </p>
        <Chip className="mt-2" variant="error" onClick={() => {}}>
          AI service is starting up. Please allow up to 2 minutes for the first request.
        </Chip>
      </Card>
    </header>
  );
}
