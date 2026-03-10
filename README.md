# Workbench — Personal UI/Dev Toolkit

Workbench is my curated collection of single-purpose browser tools designed for UI/UX designers, graphic artists, and frontend developers. I built this with a focus on visual excellence and operational speed. Every tool runs 100% in the browser—no backend, no server, and zero data tracking.

## The Philosophy

- **100% Local**: No data ever leaves my machine. Privacy by design.
- **Single Purpose**: No bloated dashboards. One tool, one job, done perfectly.
- **Premium Aesthetics**: A brutalist, handcrafted aesthetic inspired by modern editorial design.
- **Zero Friction**: No accounts, no logins, no paywalls.

## The Toolkit

Workbench Phase 1 includes 66 tools across 11 high-utility categories:

- **Greatest Hits**: QR Code generators, Palette builders.
- **Social Media**: Previews for Twitter threads, LinkedIn posts, and Instagram grids.
- **Color Lab**: Contrast checkers, Blindness simulators, and UI System builders.
- **Image Shop**: SVG optimizers, EXIF viewers, and high-quality noise generators.
- **Type & Text**: Type scales, Font pair suggestions, and Readability checkers.
- **Layout & Spacing**: 8pt grid visualizers, Golden Ratio grids, and Viewport helpers.
- **UI Components**: Interactive generators for Glassmorphism, Shadows, and Buttons.
- **Dev Utilities**: JSON formatters, CSS-to-Tailwind converters, and Meta Tag generators.
- **Content & Writing**: Copy-paste cleaners, Title capitalizers, and Regex testers.
- **UX Research**: SUS Score calculators, Empathy maps, and Persona builders.
- **Print & Production**: Bleed calculators, Paper size references, and CMYK converters.
- **Calculators**: Freelance tax estimators, Project profitability, and Salary converters.

## Tech Stack

- **Framework**: React JS (Vanilla JS)
- **Tooling**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Animations**: Framer Motion

## Getting Started

Here are the commands and steps I use to build and run this from scratch, or after cloning.

### 1. Initial Setup (If starting from scratch)
To create a new project matching this stack:
```bash
npx create-vite workbench --template react
cd workbench
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom lucide-react framer-motion clsx tailwind-merge
```

### 2. Install dependencies (If cloning)
Ensure Node.js is installed, then run:
```bash
npm install
```

### 3. Run the development server
Start the local server with hot-reload:
```bash
npm run dev
```

### 4. Open in browser
Navigate to http://localhost:5173 to start using the toolkit.

---

## Build and Deployment

To create a production-ready bundle:
```bash
npm run build
```
The optimized assets will be generated in the `dist/` directory.

## Architecture Note

I built Workbench using a Lazy-Loaded Route Architecture. Each tool is stored in its own directory under `src/tools/` and is only loaded into memory when I navigate to it. This ensures that even as the toolkit grows, the initial load remains instantaneous.

---

Built for my own creative workflows.
