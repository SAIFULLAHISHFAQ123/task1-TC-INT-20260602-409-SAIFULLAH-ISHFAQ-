import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (storedPrefs === 'light' || storedPrefs === 'dark') {
      return storedPrefs;
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }
  return 'light';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem('color-theme', action.payload);
      updateDocumentTheme(action.payload);
    },
    toggleTheme: (state) => {
      const nextTheme = state.mode === 'light' ? 'dark' : 'light';
      state.mode = nextTheme;
      localStorage.setItem('color-theme', nextTheme);
      updateDocumentTheme(nextTheme);
    },
  },
});

export const updateDocumentTheme = (theme: ThemeMode) => {
  const root = window.document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

// Apply theme on initial load
updateDocumentTheme(getInitialTheme());

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
