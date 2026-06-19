import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setTheme, type ThemeMode } from '../redux/slices/themeSlice';
import { Shield, Languages, Palette, CheckCircle, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(state => state.theme.mode);

  // Form State
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@teyzixcore.com',
    role: 'Senior Frontend Architect'
  });
  
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '' });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: '', email: '' };

    if (!profile.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!profile.email.trim() || !/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleThemeOption = (mode: ThemeMode) => {
    dispatch(setTheme(mode));
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {t('settingsPage.title')}
        </h2>
        <p className="text-xs text-slate-450 dark:text-slate-500 mt-1">
          Customize look and feel, set default languages, and configure administrator metadata.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 rounded-xl flex items-center gap-2.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold animate-fade-in">
          <CheckCircle size={16} />
          <span>{t('settingsPage.saved')}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Preference controls */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Theme Setup */}
          <div className="glass-card p-6 border border-slate-205 dark:border-slate-800/80 space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Palette size={16} className="text-slate-400" />
              {t('settingsPage.theme')}
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
              <button
                onClick={() => handleThemeOption('light')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  themeMode === 'light'
                    ? 'border-violet-500 bg-violet-50/30 text-violet-650'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-650">
                  ☀️
                </div>
                <span>{t('settingsPage.light')}</span>
              </button>

              <button
                onClick={() => handleThemeOption('dark')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  themeMode === 'dark'
                    ? 'border-violet-500 bg-violet-950/20 text-violet-400'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-850 flex items-center justify-center text-slate-150">
                  🌙
                </div>
                <span>{t('settingsPage.dark')}</span>
              </button>
            </div>
          </div>

          {/* Language Switch */}
          <div className="glass-card p-6 border border-slate-205 dark:border-slate-800/80 space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Languages size={16} className="text-slate-400" />
              {t('settingsPage.language')}
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
              <button
                onClick={() => changeLanguage('en')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  i18n.language.startsWith('en')
                    ? 'border-violet-500 bg-violet-50/30 text-violet-650'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350'
                }`}
              >
                <span className="text-lg">🇬🇧</span>
                <span>English</span>
              </button>

              <button
                onClick={() => changeLanguage('ur')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all font-urdu ${
                  i18n.language.startsWith('ur')
                    ? 'border-violet-500 bg-violet-950/20 text-violet-400'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350'
                }`}
              >
                <span className="text-lg">🇵کی</span>
                <span>اردو (Urdu)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Profile metadata update Form */}
        <div>
          <form 
            onSubmit={handleSave}
            className="glass-card p-6 border border-slate-205 dark:border-slate-800/80 space-y-5 text-xs font-semibold text-slate-650 dark:text-slate-400"
          >
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-805 pb-3">
              <Shield size={16} className="text-slate-400" />
              {t('settingsPage.profileSec')}
            </h3>

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label>{t('settingsPage.name')}</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className={`bg-white dark:bg-slate-900 border py-2.5 px-3 rounded-xl text-slate-750 dark:text-slate-200 ${errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'}`}
              />
              {errors.name && <span className="text-[10px] text-rose-500 font-bold">{errors.name}</span>}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label>{t('settingsPage.email')}</label>
              <input
                type="text"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className={`bg-white dark:bg-slate-900 border py-2.5 px-3 rounded-xl text-slate-750 dark:text-slate-200 ${errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'}`}
              />
              {errors.email && <span className="text-[10px] text-rose-500 font-bold">{errors.email}</span>}
            </div>

            {/* Role Input (Disabled) */}
            <div className="flex flex-col gap-1.5 opacity-60">
              <label>{t('settingsPage.role')}</label>
              <input
                type="text"
                value={profile.role}
                disabled
                className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 py-2.5 px-3 rounded-xl text-slate-500 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600 to-indigo-650 hover:opacity-90 text-white text-xs font-bold rounded-xl shadow-lg shadow-violet-500/10 transition-all active:scale-95 mt-4"
            >
              <Save size={15} />
              <span>{t('settingsPage.save')}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
export default Settings;
