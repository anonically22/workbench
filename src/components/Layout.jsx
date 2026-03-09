import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        const saved = localStorage.getItem('sidebar-open');
        return saved !== null ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem('sidebar-open', JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main
                className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}
            >
                <div className="max-w-6xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
