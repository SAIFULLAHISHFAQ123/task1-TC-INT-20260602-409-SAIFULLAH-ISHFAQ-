import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ur';

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Determine main body padding based on sidebar status and RTL language orientation
  const getContentPaddingClasses = () => {
    if (isMobile) return 'pl-0 pr-0';
    
    if (sidebarOpen) {
      return isRtl ? 'pr-64 pl-0' : 'pl-64 pr-0';
    } else {
      return isRtl ? 'pr-20 pl-0' : 'pl-20 pr-0';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        isMobile={isMobile} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${getContentPaddingClasses()}`}>
        {/* Top Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content Wrapper */}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
export default Layout;
