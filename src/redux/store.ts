import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import themeReducer from './slices/themeSlice';
import dashboardReducer from './slices/dashboardSlice';
import customerReducer from './slices/customerSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    dashboard: dashboardReducer,
    customers: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout the app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
