import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ToolShell from './components/ToolShell';
import { tools } from './data/tools';
import { RefreshCw } from 'lucide-react';

// Helper to map category names to folder names
const categoryFolderMap = {
  "Greatest Hits": "greatest-hits",
  "Social Media": "social-media",
  "Colour": "colour",
  "Images & Assets": "images-assets",
  "Typography & Text": "typography-text",
  "Layout & Spacing": "layout-spacing",
  "UI Components": "ui-components",
  "Developer Tools": "developer-tools",
  "Content & Writing": "content-writing",
  "UX Research": "ux-research",
  "Print & Production": "print-production",
  "Calculators": "calculators"
};

// Helper to map slugs to component names
const slugToComponentMap = {
  "qr-generator": "QRGenerator",
  "palette-generator": "PaletteGenerator",
  // Social Media
  "social-cropper": "SocialMediaCropper",
  "matte-generator": "MatteGenerator",
  "seamless-scroll": "SeamlessScroll",
  "watermarker": "Watermarker",
  // Colour
  "colour-converter": "ColourConverter",
  "tailwind-shades": "TailwindShades",
  "harmony-generator": "HarmonyGenerator",
  "contrast-checker": "ContrastChecker",
  "blindness-simulator": "BlindnessSimulator",
  "gradient-generator": "GradientGenerator",
  "tint-shade-generator": "TintShadeGenerator",
  "colour-name-finder": "ColourNameFinder",
  "screen-picker": "ScreenPicker",
  "ui-system-builder": "UISystemBuilder",
  "accessible-pairs": "AccessiblePairs",
  "cmyk-rgb-converter": "CMYKRGBConverter",
  // Images & Assets
  "favicon-generator": "FaviconGenerator",
  "svg-optimiser": "SVGOptimiser",
  "image-resizer": "ImageResizer",
  "image-compressor": "ImageCompressor",
  "base64-encoder": "Base64Encoder",
  "exif-viewer": "EXIFDataViewer",
  "noise-generator": "NoiseGenerator",
  "mockup-frame": "MockupFrame",
  "export-multiplier": "ExportMultiplier",
  // Typography & Text
  "type-scale": "TypeScale",
  "font-suggestion": "FontSuggestion",
  "case-converter": "CaseConverter",
  "readability-checker": "ReadabilityChecker",
  "word-counter": "WordCounter",
  "glyph-browser": "GlyphBrowser",
  "lorem-ipsum": "LoremIpsum",
  // Layout & Spacing
  "aspect-ratio": "AspectRatioCalculator",
  "grid-overlay": "GridOverlay",
  "golden-ratio": "GoldenRatio",
  "spacing-visualiser": "SpacingVisualiser",
  "viewport-helper": "ViewportHelper",
  "eight-pt-grid": "EightPtGrid",
  // UI Components
  "glassmorphism-generator": "GlassmorphismGenerator",
  "box-shadow-generator": "BoxShadowGenerator",
  "border-radius-preview": "BorderRadiusPreview",
  "button-generator": "ButtonGenerator",
  "input-stylist": "InputStylist",
  "simple-icon-set": "SimpleIconSet",
  // Developer Tools
  "json-formatter": "JSONFormatter",
  "css-tailwind-converter": "CSSToTailwind",
  "event-key-code": "EventKeyCode",
  "meta-tag-generator": "MetaTagGenerator",
  "html-entity-encoder": "HTMLEntityEncoder",
  "cursor-preview": "CursorPreview",
  // Content & Writing
  "copy-paste-cleaner": "CopyPasteCleaner",
  "title-capitalisation": "TitleCapitalisation",
  "text-rephraser": "TextRephraser",
  "list-converter": "ListConverter",
  "markdown-previewer": "MarkdownPreviewer",
  "regex-tester": "RegexTester",
  // UX Research
  "interview-template": "InterviewTemplate",
  "consent-generator": "ConsentGenerator",
  "sus-calculator": "SUSCalculator",
  "empathy-map": "EmpathyMap",
  "persona-builder": "PersonaBuilder",
  "findings-summary": "FindingsSummary",
  // Print & Production
  "paper-size": "PaperSizeReference",
  "bleed-calculator": "BleedCalculator",
  "dpi-pixel-converter": "DPIToPixel",
  "folder-crease": "FolderCrease",
  "golden-ratio-print": "GoldenRatioPrint",
  "cmyk-hex": "CMYKToHEX",
  // Calculators
  "hourly-salary": "SalaryCalculator",
  "project-profitability": "ProfitabilityCalculator",
  "freelance-tax": "TaxEstimator",
  "cost-of-living": "CostOfLiving",
  "screen-resolution": "ScreenResolution",
  "studio-loan": "StudioLoan"
};

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={
          <div className="flex h-[400px] items-center justify-center">
            <RefreshCw className="animate-spin text-primary" size={32} />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            {tools.map((tool) => {
              const folder = categoryFolderMap[tool.category];
              const componentName = slugToComponentMap[tool.slug];

              let ToolComponent;
              if (componentName && folder) {
                ToolComponent = lazy(() => import(`./tools/${folder}/${componentName}.jsx`));
              }

              return (
                <Route
                  key={tool.slug}
                  path={`/tools/${tool.slug}`}
                  element={
                    <ToolShell
                      title={tool.name}
                      description={tool.description}
                      badge={tool.badge}
                    >
                      {ToolComponent ? (
                        <ToolComponent />
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                          <div className="w-16 h-16 bg-sidebar rounded-full flex items-center justify-center text-primary animate-pulse">
                            <span className="font-bold text-2xl">{tool.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-text-primary">Coming Soon</h2>
                            <p className="text-text-secondary">This tool is currently under development. Stay tuned!</p>
                          </div>
                        </div>
                      )}
                    </ToolShell>
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
