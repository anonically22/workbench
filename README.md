# Workbench — Personal UI/Dev Toolkit

Workbench is my curated collection of single-purpose browser tools designed for UI/UX designers, graphic artists, and frontend developers. I built this with a focus on visual excellence and operational speed. Every tool runs 100% in the browser—no backend, no server, and zero data tracking.

## The Philosophy

- **100% Local**: No data ever leaves my machine. Privacy by design.
- **Single Purpose**: No bloated dashboards. One tool, one job, done perfectly.
- **Premium Aesthetics**: A brutalist, handcrafted aesthetic inspired by modern editorial design.
- **Zero Friction**: No accounts, no logins, no paywalls.

## Progress Update: Phase 2 Complete (v0.5)

I've just finished implementing **Phase 2**, bringing the total up to **27 fully functional tools**. 

**Recent Updates:**
- Added 12 new tools spanning Color Lab, Image Shop, Layout Tool, and Dev Utilities.
- Refined the visual design system to strict brutalism (Black, White, Slate, and Accent Blue).
- Added unique, CSS-only abstract previews for every newly added tool card.
- Implemented a custom framed "Pegboard" animation in the global header using Framer Motion.
- Applied a matching, subtle pegboard radical-gradient background across the entire workspace.
- Consolidated the application footer with the new v0.5 build metadata.

## The Toolkit

Currently featuring 27 tools across core high-utility categories:

- **Color Lab**: Tint & Shade Generators, Accessible Color Pair Finders, Tailwind Shade generators, etc.
- **Image Shop**: Image Resizers, Base64 Encoders, EXIF Metadata Viewers, and PNG Noise Texture Generators.
- **Dev Utilities**: Box Shadow generators, Diff Checkers, SVG optimization, etc.
- **Layout Tool**: Grid System Calculators and Aspect Ratio math overhauls.

## Tech Stack

- **Framework**: React JS
- **Tooling**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React / Material Symbols
- **Routing**: React Router v6
- **Animations**: Framer Motion

## Architecture Note

I built Workbench using a Lazy-Loaded Route Architecture. Each tool is stored in its own directory under `src/tools/` and is only loaded into memory when I navigate to it. This ensures that even as the toolkit grows, the initial load remains instantaneous.

---

## Build & Install Instructions

Here are the step-by-step commands to build the initial foundation and run everything locally:

### 1. Initial Scaffold & Dependencies
To create a new project matching this stack, run:
```bash
npx create-vite workbench --template react
cd workbench
npm install
npm install tailwindcss @tailwindcss/vite
npm install react-router-dom lucide-react framer-motion chroma-js diff exifr color-name-list
```

### 2. Running Locally (If Cloning)
If cloning this repository to a new machine, install the dependencies and start the dev server:
```bash
npm install
npm run dev
```

### 3. Production Build
To create a production-ready bundle optimized for deployment:
```bash
npm run build
```
The optimized static assets will be generated in the `dist/` directory, ready to be hosted on any static platform.

---

*Built for my own creative workflows.*
