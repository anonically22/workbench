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
  "favicon-generator": lazy(() => import('./tools/images-assets/FaviconGenerator.jsx'))
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
