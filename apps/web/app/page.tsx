import { SiteSearchPage } from "@/lib/site-search/components/site-search-page";
import { SiteSearchProvider } from "@/lib/site-search/site-search-state";

export default function Page() {
  return (
    <SiteSearchProvider>
      <SiteSearchPage />
    </SiteSearchProvider>
  );
}
