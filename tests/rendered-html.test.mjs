import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import { createServer } from "node:net";
import { after, before, test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";

let nextServer;
let origin;

before(async () => {
  const port = await availablePort();
  origin = `http://127.0.0.1:${port}`;

  nextServer = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: new URL("..", import.meta.url),
      env: { ...process.env, NODE_ENV: "production" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  let serverOutput = "";
  nextServer.stdout.on("data", (chunk) => {
    serverOutput += chunk;
  });
  nextServer.stderr.on("data", (chunk) => {
    serverOutput += chunk;
  });

  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (nextServer.exitCode !== null) {
      throw new Error(`Next.js exited before it became ready:\n${serverOutput}`);
    }

    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await delay(100);
  }

  throw new Error(`Next.js did not become ready:\n${serverOutput}`);
});

after(() => {
  nextServer?.kill("SIGTERM");
});

async function render(pathname = "/") {
  return fetch(new URL(pathname, origin), {
    headers: { accept: "text/html" },
  });
}

function availablePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close((error) => {
        if (error) reject(error);
        else resolve(address.port);
      });
    });
  });
}

test("server-renders the Hà Nội Xưa landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Hà Nội Xưa \| Vietnamese Restaurant in Lisbon<\/title>/i);
  assert.match(html, /<h1[^>]*>Hà Nội Xưa<\/h1>/);
  assert.doesNotMatch(html, /COZINHA VIETNAMITA AUTÊNTICA/);
  assert.match(html, /%2Fimages%2Fspace-1\.webp/);
  assert.match(html, /Sala do restaurante Hà Nội Xưa em Lisboa/);
  assert.match(html, /href="\/reservation"/);
  assert.match(html, /images\/hanoi-logo-icon\.png/);
  assert.match(html, /Gỏi Cuốn Thịt Bò/);
  assert.match(html, /Bánh Xèo/);
  assert.match(html, /Bún Bò Huế/);
  assert.match(html, /Phở Bò Tái Chín/);
  assert.match(html, /Bún Chả Hà Nội Xưa/);
  assert.match(html, /Tàu Hũ Trân Châu/);
  assert.match(html, /Av\. João Crisóstomo 47C, 1050-066 Lisboa/);
  assert.match(html, /href="tel:\+351927944599"/);
  assert.match(html, /927 944 599/);
  assert.match(html, /Domingo · Encerrado/);
  assert.match(html, /https:\/\/www\.instagram\.com\/hanoixua_lisbon\//);
  assert.match(html, /https:\/\/www\.facebook\.com\/p\/Ha-Noi-Xua-Restaurant-61562473875812\//);
  assert.match(html, /https:\/\/www\.tiktok\.com\/@hanoixualisbon/);
  assert.doesNotMatch(html, /menu final a confirmar|final menu (?:names )?(?:will be |to be )?confirmed/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("serves the reservation widget on its own page", async () => {
  const response = await render("/reservation");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Reservar Mesa \| Hà Nội Xưa<\/title>/i);
  assert.match(html, /https:\/\/reserve\.intelis\.pt\/hanoi-xua/);
  assert.match(html, /title="Ha Noi Xua"/);
});

test("ships the restaurant photography and editable data separately", async () => {
  const data = await readFile(new URL("../data/restaurant.ts", import.meta.url), "utf8");
  assert.match(data, /reservationWidgetUrl:\s*"https:\/\/reserve\.intelis\.pt\/hanoi-xua"/);
  assert.match(data, /address:\s*"Av\. João Crisóstomo 47C, 1050-066 Lisboa"/);
  assert.match(data, /phone:\s*"\+351 927 944 599"/);
  assert.match(data, /googleMapsUrl:\s*"https:\/\/www\.google\.com\/maps\/place/);

  for (const file of [
    "hanoi-street.webp",
    "hanoi-logo-icon.png",
    "hanoi-logo-text.png",
    "food-1.webp",
    "space-1.webp",
  ]) {
    await access(new URL(`../public/images/${file}`, import.meta.url));
  }
});
