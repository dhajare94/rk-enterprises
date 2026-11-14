import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { headTags, resetServerHead, takeServerHead } from "./lib/seo";

export { llmsTxt, redirectsTxt, robotsTxt, siteRoutes, sitemapXml } from "./lib/routes";

export function render(url: string) {
  resetServerHead();
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
  const head = takeServerHead();
  if (!head) throw new Error(`No SEO head rendered for ${url}`);
  return { html, head, headHtml: headTags(head) };
}
