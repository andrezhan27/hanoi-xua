import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Hà Nội Xưa landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Hà Nội Xưa \| Vietnamese Restaurant in Lisbon<\/title>/i);
  assert.match(html, /<h1[^>]*>Hà Nội Xưa<\/h1>/);
  assert.doesNotMatch(html, /COZINHA VIETNAMITA AUTÊNTICA/);
  assert.match(html, /https:\/\/reserve\.intelis\.pt\/hanoi-xua/);
  assert.match(html, /images\/hanoi-logo-icon\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("ships the restaurant photography and editable data separately", async () => {
  const data = await readFile(new URL("../data/restaurant.ts", import.meta.url), "utf8");
  assert.match(data, /reservationWidgetUrl:\s*"https:\/\/reserve\.intelis\.pt\/hanoi-xua"/);
  assert.match(data, /googleMapsUrl:\s*""/);

  for (const file of [
    "hero-1.png",
    "hero-mobile.png",
    "hanoi-street.webp",
    "hanoi-logo-icon.png",
    "hanoi-logo-text.png",
    "food-1.png",
    "space-1.png",
  ]) {
    await access(new URL(`../public/images/${file}`, import.meta.url));
  }
});
