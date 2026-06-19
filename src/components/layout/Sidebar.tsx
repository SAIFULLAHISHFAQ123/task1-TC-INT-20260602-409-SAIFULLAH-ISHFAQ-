import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  isMobile,
  toggleSidebar
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRtl = i18n.language === 'ur';

  const menuItems = [
    { path: '/', label: t('nav.dashboard'), icon: LayoutDashboard },
    { path: '/analytics', label: t('nav.analytics'), icon: BarChart3 },
    { path: '/customers', label: t('nav.customers'), icon: Users },
    { path: '/orders', label: t('nav.orders'), icon: ShoppingCart },
    { path: '/reports', label: t('nav.reports'), icon: FileText },
    { path: '/settings', label: t('nav.settings'), icon: Settings }
  ];

  const sidebarClasses = `
    fixed top-0 bottom-0 z-40 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 transition-all duration-300 shadow-sm
    ${isRtl ? 'right-0 border-l border-r-0' : 'left-0 border-r'}
    ${isMobile 
      ? (isOpen ? 'translate-x-0 w-64' : (isRtl ? 'translate-x-full w-64' : '-translate-x-full w-64')) 
      : (isOpen ? 'w-64' : 'w-20')
    }
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={sidebarClasses}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-md shadow-violet-500/20">
              <TrendingUp size={20} />
            </div>
            {isOpen && (
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-300">
                TEYZIX CORE
              </span>
            )}
          </div>
          
          {/* Collapse/Close Button */}
          {isMobile ? (
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          ) : (
            <button 
              onClick={toggleSidebar} 
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? (
                isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />
              ) : (
                isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />
              )}
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={isMobile ? () => setIsOpen(false) : undefined}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/10 dark:from-violet-650 dark:to-indigo-650' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-150'
                  }
                  ${isOpen ? 'justify-start' : 'justify-center'}
                `}
                title={!isOpen ? item.label : undefined}
              >
                <Icon size={20} className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                {isOpen && (
                  <span className="truncate">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        {isOpen && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 text-center">
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
              {t('Task ID') || 'FEWD-1 | TEYZIX'}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-mono uppercase">
              BI Analytics Dashboard
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
