import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { 
  Sun, 
  Moon, 
  Search, 
  Bell, 
  Globe, 
  Menu, 
  User, 
  LogOut, 
  Settings, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setShowProfileMenu(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(target)) {
        setShowNotifications(false);
      }
      if (langRef.current && !langRef.current.contains(target)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  const notificationList = [
    { id: 1, text: 'Stark Industries order completed successfully!', type: 'success', time: '5m ago' },
    { id: 2, text: 'Acme Corporation revenue limit reached target!', type: 'info', time: '1h ago' },
    { id: 3, text: 'System Update: Backup executed successfully.', type: 'success', time: '4h ago' },
    { id: 4, text: 'Warning: Failed login attempt detected.', type: 'warning', time: '1d ago' },
  ];

  return (
    <header className="h-16 sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between px-6 transition-all duration-300">
      
      {/* Left side: Hamburger (Mobile) & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden focus:outline-none"
        >
          <Menu size={20} />
        </button>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center relative w-72">
          <Search size={16} className="absolute left-3 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder={t('common.search')}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-850 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
          />
        </div>
      </div>

      {/* Right side: Actions & User Dropdowns */}
      <div className="flex items-center gap-2.5">
        
        {/* Search toggle for mobile */}
        <button className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
          <Search size={18} />
        </button>

        {/* Language Selection */}
        <div className="relative" ref={langRef}>
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 text-xs font-semibold uppercase transition-colors"
          >
            <Globe size={18} />
            <span className="hidden sm:inline">{i18n.language.startsWith('ur') ? 'اردو' : 'EN'}</span>
          </button>

          {showLangMenu && (
            <div className={`absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-50 text-slate-750 dark:text-slate-250 animate-fade-in ${i18n.language === 'ur' ? 'left-0 right-auto' : 'right-0'}`}>
              <button 
                onClick={() => changeLanguage('en')}
                className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between ${i18n.language.startsWith('en') ? 'text-violet-600 dark:text-violet-400 font-semibold' : ''} ${i18n.language === 'ur' ? 'text-right' : 'text-left'}`}
              >
                <span>English</span>
                {i18n.language.startsWith('en') && <div className="w-1.5 h-1.5 bg-violet-600 rounded-full" />}
              </button>
              <button 
                onClick={() => changeLanguage('ur')}
                className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between font-urdu ${i18n.language.startsWith('ur') ? 'text-violet-600 dark:text-violet-400 font-semibold' : ''} ${i18n.language === 'ur' ? 'text-right' : 'text-left'}`}
              >
                <span>اردو (Urdu)</span>
                {i18n.language.startsWith('ur') && <div className="w-1.5 h-1.5 bg-violet-600 rounded-full" />}
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={themeMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {themeMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifyRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in ${i18n.language === 'ur' ? 'left-0 right-auto' : 'right-0'}`}>
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-100">{t('common.notifications')}</span>
                <span className="text-[10px] bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-full font-medium">4 New</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notificationList.map((item) => (
                  <div key={item.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 border-b border-slate-50 dark:border-slate-800/20 flex gap-3 cursor-pointer">
                    {item.type === 'success' ? (
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : item.type === 'warning' ? (
                      <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <ShieldCheck size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-[11px] text-slate-700 dark:text-slate-355 line-clamp-2 leading-relaxed">{item.text}</p>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 block">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-violet-500/10">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none">Admin User</p>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">Teyzix Architect</p>
            </div>
          </button>

          {showProfileMenu && (
            <div className={`absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-slate-700 dark:text-slate-250 animate-fade-in ${i18n.language === 'ur' ? 'left-0 right-auto' : 'right-0'}`}>
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Administrator</p>
                <p className="text-[10px] text-slate-450 dark:text-slate-500 truncate">admin@teyzixcore.com</p>
              </div>
              <div className="py-1">
                <a href="/settings" className="flex items-center gap-2.5 px-4 py-2.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <User size={14} className="text-slate-400" />
                  <span>My Profile</span>
                </a>
                <a href="/settings" className="flex items-center gap-2.5 px-4 py-2.5 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <Settings size={14} className="text-slate-400" />
                  <span>Settings</span>
                </a>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                <button 
                  onClick={() => alert('Log out simulated.')}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-left font-medium"
                >
                  <LogOut size={14} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
