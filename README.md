# Hà Nội Xưa

Bilingual restaurant website for Hà Nội Xưa in Lisbon, built with the official Next.js App Router. The site uses a warm editorial design, real restaurant photography, a responsive gallery, Portuguese/English content, and accessible motion.

## Run locally

Node.js 22.13 or newer is required. If you use `nvm`, run `nvm use`
before installing dependencies.

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal.

## Production build

```bash
npm run build
```

No environment variables are required.

## Updating content

- Business details and external URLs: `data/restaurant.ts`
- Portuguese and English copy: `data/translations.ts`
- Dish names and image mapping: `data/dishes.ts`
- Photography and logo assets: `public/images/`

The restaurant address, phone, opening hours, reservation, maps, and social links are maintained in the data files above.
