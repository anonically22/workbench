import { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteConfigProvider } from './context/SiteConfigContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ManagePanel from './pages/ManagePanel';
import ToolShell from './components/ToolShell';
import { tools } from './data/tools';
import { RefreshCw } from 'lucide-react';
import toolComponentMap from './app/routes';
import PegboardAnimation from './components/PegboardAnimation';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Let the PegboardAnimation run through its initial drop-in and hold
    // roughly ~2500ms allows the animation to be nicely visible before fading out
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SiteConfigProvider>
      <Router>
        <AnimatePresence mode="wait">
          {initialLoad ? (
            <motion.div
              key="initial-loader"
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center bg-zinc-50"
            >
              <PegboardAnimation />
            </motion.div>
          ) : (
            <motion.div
              key="app-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full w-full"
            >
              <Suspense fallback={
                <div className="flex h-screen w-full items-center justify-center bg-zinc-50">
                  <PegboardAnimation />
                </div>
              }>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/manage" element={<ManagePanel />} />
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
            </motion.div>
          )}
        </AnimatePresence>
      </Router>
    </SiteConfigProvider>
  );
}

export default App;
