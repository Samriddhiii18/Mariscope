# Mariscope — clearer ocean watch

Mariscope is a mission-oriented research prototype for turning ocean observations into practical next steps. It demonstrates three workflows:

- **Dark ships:** compare a satellite-observed vessel with the available AIS picture and recommend verification or re-observation.
- **Illegal fishing:** prioritise fishing-like activity in protected or restricted waters for authorisation and human review.
- **Oil spills:** review possible dark slicks, estimate drift and investigate a possible source.

The first screen below the top bar is the animated **Sonic Waveform** hero. It responds to pointer movement and leads into the operational watch.

## Open the deployed-style preview

Use the live preview link provided by the Arena process panel. It serves the Vite production build with bundled CSS and JavaScript, so it behaves like a deployed site rather than like a downloaded HTML file.

## Run locally

Do not double-click `index.html`; browsers commonly block module paths and local asset requests when a file is opened directly. Run it through a local HTTP server instead:

```bash
npm install
npm run dev
```

Then open the URL printed by Vite, normally `http://localhost:5173`.

## Deploy to Vercel — recommended

This is a static Vite frontend, so Vercel is the simplest fit. Import the GitHub repository into Vercel and use:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm ci`

The repository includes `vercel.json` with these settings. No server or API process is required for the current prototype.

## Deploy to Render

Render also works as a Static Site. Create a new **Static Site**, connect the repository, and use:

- **Build command:** `npm ci && npm run build`
- **Publish directory:** `dist`

The repository includes `render.yaml` for a Render Blueprint deployment.

To test the production build locally:

```bash
npm run build
npm run preview
```

## React, TypeScript, Tailwind and shadcn structure

The requested React component is available at:

- `components/ui/sonic-waveform.tsx`

The project also includes `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `components.json`, `lib/utils.ts` and the Tailwind entry file at `src/app/globals.css`. The component uses `framer-motion` and `lucide-react`, which are installed in `package.json` and locked in `package-lock.json`.

The main preview includes a dependency-free canvas equivalent so the complete website also works in the bundled static build and can be hosted without a React runtime at the edge. The typed React component is ready to import in a shadcn-compatible React/Next application:

```tsx
import SonicWaveformHero from "@/components/ui/sonic-waveform";
```

`/components/ui` is the expected shadcn UI directory. Keeping reusable primitives there makes the `@/components/ui/...` import stable and lets the shadcn CLI add or update components without mixing them into page-specific code.

## Prototype scope

The browser app uses representative demo observations so it can be demonstrated without API keys or operational permissions. It does **not** connect to live Sentinel-1, AIS, CYGNSS, ECMWF, Global Fishing Watch, CleanSeaNet or NOAA feeds. Production connectors would require approved access, licensing, credentials, processing infrastructure and local authority agreements.

The editable solution and research planning documents are available at the workspace root:

- `../dark_ship_watch_solution_summary.docx`
- `../dark_ship_sar_ais_gnssr_research_plan.docx`

## Important wording

“Dark ship” is a neutral operational label for an observed vessel that is not matched in the available data. It is not proof of illegal activity. Similarly, fishing-like activity is not automatically illegal, and a dark SAR feature is not automatically oil. Cases are intended to support human review, evidence collection and lawful action by the relevant authority.
