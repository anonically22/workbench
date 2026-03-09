# Nixby — Personal UI/UX & Graphic Design Toolkit

Nixby is a curated collection of single-purpose browser tools designed for UI/UX designers, graphic artists, and frontend developers. Built with a focus on **visual excellence** and **operational speed**, every tool runs 100% in the browser—no backend, no server, and no data tracking.

![Nixby Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200)

## The Philosophy

- **100% Local**: No data ever leaves your machine. Privacy by design.
- **Single Purpose**: No bloated dashboards. One tool, one job, done perfectly.
- **Premium Aesthetics**: A "Dashboard" aesthetic inspired by modern editorial design.
- **Zero Friction**: No accounts, no logins, no paywalls.

## The Toolkit (66 Tools)

Nixby Phase 1 includes **66 tools** across 11 high-utility categories:

- **Greatest Hits**: QR Code generators, Palette builders.
- **Social Media**: Previews for Twitter threads, LinkedIn posts, and Instagram grids.
- **Colour Science**: Contrast checkers, Blindness simulators, and UI System builders.
- **Images & Assets**: SVG optimisers, EXIF viewers, and high-quality noise generators.
- **Typography**: Type scales, Font pair suggestions, and Readability checkers.
- **Layout & Spacing**: 8pt grid visualisers, Golden Ratio grids, and Viewport helpers.
- **UI Components**: Interactive generators for Glassmorphism, Shadows, and Buttons.
- **Developer Tools**: JSON formatters, CSS-to-Tailwind converters, and Meta Tag generators.
- **Content & Writing**: Copy-paste cleaners, Title capitalisers, and Regex testers.
- **UX Research**: SUS Score calculators, Empathy maps, and Persona builders.
- **Print & Production**: Bleed calculators, Paper size references, and CMYK converters.
- **Calculators**: Freelance tax estimators, Project profitability, and Salary converters.

## Tech Stack

- **Framework**: [React JS](https://reactjs.org/) (no TypeScript)
- **Tooling**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (utility classes only)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/nixby.git
cd nixby
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```



## 🏗️ Architecture Note

Nixby uses a **Lazy-Loaded Route Architecture**. Each tool is stored in its own directory under `src/tools/` and is only loaded into memory when the user navigates to it. This ensures that even as the toolkit grows to 100+ tools, the initial load remains instantaneous.

---

*Built for the next generation of creative technologists.*
