# Workbench — Personal UI/Dev Toolkit

Workbench is my growing collection of single-purpose browser tools built for **UI/UX designers, graphic artists, and frontend developers**.

Every tool here is designed to do **one thing well**—fast, local, and without friction. No dashboards, no accounts, and no hidden network calls. Just practical utilities I built to support my own design and development workflows.

Everything runs **100% in the browser**.

---

## Philosophy

Workbench follows a few simple rules.

### Local First
All tools run entirely in the browser.  
No servers. No tracking. No data leaving your machine.

### Single-Purpose Tools
Each utility focuses on one job and does it properly.  
No bloated feature stacks.

### Handcrafted Design
The interface follows a brutalist editorial aesthetic: bold structure, minimal color, and clear hierarchy.

### Zero Friction
Open the site → use the tool → move on.  
No logins or configuration required.

---

## Current Status

Workbench is currently transitioning from the experimental **v0.x builds** into the first stable release line.

The project started as a personal toolkit and has gradually grown into a structured set of utilities covering color, layout, assets, and developer workflows.

### Recent development milestones

- Expansion to **27+ fully working tools**
- Dedicated categories for color, images, layout, and developer utilities
- A consistent brutalist design system
- CSS-only visual previews for each tool card
- Custom pegboard animation system in the header
- Lazy-loaded tools for faster initial load

The upcoming **v1.x series** will focus on polishing the experience and improving discovery.

---

## Toolkit Overview

Workbench currently includes tools across several core categories.

### Color Lab
- Palette generators  
- Tint & shade tools  
- Tailwind shade systems  
- Accessibility contrast helpers  

### Image Shop
- Image resizers  
- Base64 encoders  
- EXIF metadata viewers  
- PNG noise texture generators  

### Dev Utilities
- JSON formatting  
- Diff checking  
- SVG optimization  
- Box shadow generators  

### Layout Tools
- Grid system calculators  
- Aspect ratio helpers  
- Responsive layout utilities  

The toolkit will continue expanding, but always within the same idea:

**small, useful tools for building things.**

---

## Tech Stack

Workbench is intentionally lightweight.

**Framework**  
React

**Tooling**  
Vite

**Styling**  
Tailwind CSS v4

**Routing**  
React Router v6

**Icons**  
Lucide React  
Material Symbols

**Animations**  
Framer Motion

All tools run client-side using standard browser APIs.

---

## Architecture

Workbench uses a **lazy-loaded route architecture**.

Each tool lives inside its own directory under:


Tools are only loaded when they are opened.  
This keeps the initial load fast even as more utilities are added.

The system is designed so new tools can be added without affecting existing ones.

---

## Running Locally

If you want to run Workbench locally:

Install dependencies:

```bash
npm install
```

Build optimized bundle:

```bash
npm run build
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

The build output goes to `dist/` and can be hosted anywhere.

---

## Adding New Tools

Adding a new tool to Workbench is straightforward.

1. Create a new directory under `src/tools/`:

```bash
mkdir -p src/tools/category-name/tool-name
```

2. Create the tool component:

```jsx
// src/tools/category-name/tool-name/ToolName.jsx
export default function ToolName() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tool Name</h1>
      {/* Tool UI goes here */}
    </div>
  );
}
```

3. Add the lazy route to `src/app/routes.jsx`:

```jsx
// Add to the appropriate category map
"tool-name": lazy(() => import('../tools/category-name/tool-name/ToolName.jsx')),
```

4. Add metadata to `src/data/tools.js`:

```js
// Add to the correct category array
{
  slug: "tool-name",
  title: "Tool Name",
  description: "What this tool does.",
  category: "category-name",
  icon: "lucide-icon-name",
  preview: () => <ToolPreview /> // Optional CSS-only preview
}
```

5. Add a preview component if desired:

```jsx
// src/tools/category-name/tool-name/ToolPreview.jsx
export default function ToolPreview() {
  return (
    <div className="w-full h-full bg-white border border-black flex items-center justify-center">
      <span className="text-sm">Tool Preview</span>
    </div>
  );
}
```

That's it.

The new tool will automatically appear in the navigation and on the homepage.

---

## Future Plans

Workbench is planned to evolve over time, but the core principles will remain.

### Upcoming improvements

- **Improved discovery**  
  Better filtering and search across tools
- **Tool collections**  
  Group related tools into curated sets
- **Performance optimizations**  
  Further reducing bundle size
- **Accessibility enhancements**  
  Expanding contrast and readability tools
- **Expanded layout utilities**  
  More responsive design helpers

### Long-term vision

Workbench will continue to grow as a **personal, high-quality toolkit** for creative work.

It will always stay true to:

- **100% local execution**  
- **Single-purpose tools**  
- **Clean, brutalist design**  
- **Zero friction**

---
## Live Version

You can try the current version here:
``` bash
https://workbench-nine.vercel.app/
```
## License

Workbench is built for personal use and is open for others to use, modify, and extend under the MIT license.

---

*Built for my own creative workflows.*

*Version 0.5*
*Last updated: 2026-03-15*