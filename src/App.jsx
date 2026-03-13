import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ToolShell from './components/ToolShell';
import { tools } from './data/tools';
import { RefreshCw } from 'lucide-react';

// Statically map complete lazy imports for Vite
const toolComponentMap = {
  "qr-forge": lazy(() => import('./tools/greatest-hits/QRGenerator.jsx')),
  "palette-lab": lazy(() => import('./tools/greatest-hits/PaletteGenerator.jsx')),
  "social-cropper": lazy(() => import('./tools/social-media/SocialMediaCropper.jsx')),
  "aspect-calculator": lazy(() => import('./tools/layout-spacing/AspectRatioCalculator.jsx')),
  "svg-surgeon": lazy(() => import('./tools/images-assets/SVGOptimiser.jsx')),
  "unit-converter": lazy(() => import('./tools/calculators/UnitConverter.jsx')),
  "gradient-generator": lazy(() => import('./tools/colour/GradientGenerator.jsx')),
  "contrast-checker": lazy(() => import('./tools/colour/ContrastChecker.jsx')),
  "json-formatter": lazy(() => import('./tools/developer-tools/JSONFormatter.jsx')),
  "slug-generator": lazy(() => import('./tools/developer-tools/SlugGenerator.jsx')),
  "word-counter": lazy(() => import('./tools/typography-text/WordCounter.jsx')),
  "password-generator": lazy(() => import('./tools/developer-tools/PasswordGenerator.jsx')),
  "markdown-previewer": lazy(() => import('./tools/content-writing/MarkdownPreviewer.jsx')),
  "image-compressor": lazy(() => import('./tools/images-assets/ImageCompressor.jsx')),
  "favicon-generator": lazy(() => import('./tools/images-assets/FaviconGenerator.jsx')),

  // Phase 2 Tools
  "tint-shade-generator": lazy(() => import('./tools/colour/TintShadeGenerator.jsx')),
  "tailwind-shade-generator": lazy(() => import('./tools/colour/TailwindShades.jsx')),
  "color-name-finder": lazy(() => import('./tools/colour/ColourNameFinder.jsx')),
  "accessible-color-pair-finder": lazy(() => import('./tools/colour/AccessiblePairs.jsx')),

  "image-resizer": lazy(() => import('./tools/images-assets/ImageResizer.jsx')),
  "base64-image-encoder": lazy(() => import('./tools/images-assets/Base64Encoder.jsx')),
  "exif-metadata-viewer": lazy(() => import('./tools/images-assets/EXIFDataViewer.jsx')),
  "noise-texture-generator": lazy(() => import('./tools/images-assets/NoiseGenerator.jsx')),

  "diff-checker": lazy(() => import('./tools/developer-tools/DiffChecker.jsx')),
  "encoding-tools": lazy(() => import('./tools/developer-tools/EncodingTools.jsx')),
  "box-shadow-generator": lazy(() => import('./tools/ui-components/BoxShadowGenerator.jsx')),

  "grid-system-calculator": lazy(() => import('./tools/layout-spacing/GridSystemCalculator.jsx')),

  // Phase 3 Tools
  "button-style-generator": lazy(() => import('./tools/ui-components/ButtonStyleGenerator.jsx')),
  "shadow-palette-generator": lazy(() => import('./tools/ui-components/ShadowPaletteGenerator.jsx')),
  "border-radius-scale-generator": lazy(() => import('./tools/ui-components/BorderRadiusScaleGenerator.jsx')),
  "skeleton-screen-generator": lazy(() => import('./tools/ui-components/SkeletonScreenGenerator.jsx')),
  
  "flexbox-playground": lazy(() => import('./tools/layout-spacing/FlexboxPlayground.jsx')),
  "golden-ratio-calculator": lazy(() => import('./tools/layout-spacing/GoldenRatioCalculator.jsx')),
  "8pt-grid-checker": lazy(() => import('./tools/layout-spacing/EightPointGridChecker.jsx')),
  
  "text-case-converter": lazy(() => import('./tools/content-writing/TextCaseConverter.jsx')),
  "lorem-ipsum-generator": lazy(() => import('./tools/content-writing/LoremIpsumGenerator.jsx')),
  "readability-checker": lazy(() => import('./tools/content-writing/ReadabilityChecker.jsx')),
  
  "fake-data-generator": lazy(() => import('./tools/dev-utilities/FakeDataGenerator.jsx')),
  "character-map-browser": lazy(() => import('./tools/dev-utilities/CharacterMapBrowser.jsx')),
  
  // Phase 4 Tools
  "mockup-frame-generator": lazy(() => import('./tools/images-assets/MockupFrameGenerator.jsx')),
  "seamless-scroll-generator": lazy(() => import('./tools/images-assets/SeamlessScrollGenerator.jsx')),
  "watermarker": lazy(() => import('./tools/images-assets/Watermarker.jsx')),
  "screen-color-picker": lazy(() => import('./tools/images-assets/ScreenColorPicker.jsx')),

  "touch-target-checker": lazy(() => import('./tools/design-inspection/TouchTargetChecker.jsx')),
  "reading-flow-simulator": lazy(() => import('./tools/design-inspection/ReadingFlowSimulator.jsx')),
  "artboard-size-reference": lazy(() => import('./tools/design-inspection/ArtboardSizeReference.jsx')),

  "bleed-margin-calculator": lazy(() => import('./tools/layout-spacing/BleedMarginCalculator.jsx')),
  "export-multiplier-calculator": lazy(() => import('./tools/layout-spacing/ExportMultiplierCalculator.jsx')),

  "css-clamp-generator": lazy(() => import('./tools/dev-utilities/CssClampGenerator.jsx')),
  "css-grid-generator": lazy(() => import('./tools/dev-utilities/CssGridGenerator.jsx')),
  "svg-path-visualizer": lazy(() => import('./tools/dev-utilities/SvgPathVisualizer.jsx')),
};

function App() {
  return (
    <Router>
      <Suspense fallback={
        <div className="flex h-[400px] items-center justify-center">
          <RefreshCw className="animate-spin text-accent" size={32} />
        </div>
      }>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            {tools.map((tool) => {
              const ToolComponent = toolComponentMap[tool.slug];

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
                          <div className="w-16 h-16 border-2 border-black rounded-none flex items-center justify-center bg-accent text-white animate-pulse brutalist-shadow">
                            <span className="font-bold text-2xl">{tool.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h2 className="text-xl font-black uppercase tracking-tight text-black">Coming Soon</h2>
                            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-2">{tool.slug} is under construction</p>
                          </div>
                        </div>
                      )}
                    </ToolShell>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
