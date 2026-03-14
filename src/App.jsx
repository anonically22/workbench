import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteConfigProvider } from './context/SiteConfigContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ManagePanel from './pages/ManagePanel';
import ToolShell from './components/ToolShell';
import { tools } from './data/tools';
import { RefreshCw } from 'lucide-react';
import toolComponentMap from './app/routes';

function App() {
  return (
    <SiteConfigProvider>
      <Router>
        <Suspense fallback={
          <div className="flex h-[400px] items-center justify-center">
            <RefreshCw className="animate-spin text-accent" size={32} />
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
      </Router>
    </SiteConfigProvider>
  );
}

export default App;
