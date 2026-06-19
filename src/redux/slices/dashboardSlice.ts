import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DashboardFilters } from '../../types';

interface DashboardState {
  filters: DashboardFilters;
  refreshKey: number; // Used to trigger api re-fetches
  apiDelay: number;   // Configurable latency for showing skeleton loaders (default 800ms)
  apiErrorTrigger: boolean; // Trigger to simulate API error for UX validation
}

const initialState: DashboardState = {
  filters: {
    dateRange: {
      startDate: '2025-01-01',
      endDate: '2025-12-31'
    },
    revenueRange: {
      min: 0,
      max: 500000
    },
    region: 'All',
    status: 'All'
  },
  refreshKey: 0,
  apiDelay: 800,
  apiErrorTrigger: false
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      state.filters.dateRange = action.payload;
    },
    setRevenueRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filters.revenueRange = action.payload;
    },
    setRegionFilter: (state, action: PayloadAction<string>) => {
      state.filters.region = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    triggerRefresh: (state) => {
      state.refreshKey += 1;
    },
    setApiDelay: (state, action: PayloadAction<number>) => {
      state.apiDelay = action.payload;
    },
    toggleApiErrorTrigger: (state) => {
      state.apiErrorTrigger = !state.apiErrorTrigger;
    }
  }
});

export const {
  setDateRange,
  setRevenueRange,
  setRegionFilter,
  setStatusFilter,
  clearFilters,
  triggerRefresh,
  setApiDelay,
  toggleApiErrorTrigger
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
