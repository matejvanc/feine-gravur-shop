import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the multilingual personalized shop", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang=["']de["']/i);
  assert.match(html, /Feine Gravur/);
  assert.match(html, /Geschenke mit Gravur/);
  assert.match(html, /christmas-baubles-main\.jpeg/);
  assert.match(html, /Gravierte Weihnachtskugeln/);
  assert.match(html, /Holz-Lesezeichen/);
  assert.match(html, /Holz-Anhänger/);
  assert.match(html, /Holz-Flaschenöffner/);
  assert.match(html, /Holz-Kugelschreiber/);
  assert.match(html, /Logo-Motiv/);
  assert.match(html, />DE</);
  assert.match(html, />EN</);
  assert.match(html, />CS</);
  assert.match(html, />FR</);
  assert.match(html, />IT</);
  assert.match(html, /Text bis[\s\S]*12[\s\S]*Zeichen/);
  assert.match(html, /Allgemeine Geschäftsbedingungen/);
  assert.match(html, /In den Warenkorb/);
  assert.match(html, /Warenkorb/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("starter preview files and dependencies are removed", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const TEXT_LIMIT = 12;/);
  assert.match(page, /type LanguageCode = "de" \| "en" \| "cs" \| "fr" \| "it";/);
  assert.match(page, /useState<LanguageCode>\("de"\)/);
  assert.match(page, /language-switcher/);
  assert.match(page, /document\.documentElement\.lang = language/);
  assert.match(page, /const homeCopy/);
  assert.match(page, /intro-gallery/);
  assert.match(page, /scrollIntoView/);
  assert.match(page, /className={`product-card/);
  assert.match(page, /Gravírované vánoční ozdoby/);
  assert.match(page, /Engraved Christmas Baubles/);
  assert.match(page, /Boules de Noël gravées/);
  assert.match(page, /Palline di Natale incise/);
  assert.match(page, /maxLength={TEXT_LIMIT}/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await access(new URL("../public/products/christmas-baubles-main.jpeg", import.meta.url));
  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});
