import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { 
  setDateRange, 
  setRevenueRange, 
  setRegionFilter, 
  setStatusFilter, 
  clearFilters,
  triggerRefresh,
  toggleApiErrorTrigger,
  setApiDelay
} from '../../redux/slices/dashboardSlice';
import { Filter, X, RefreshCw, AlertTriangle, Clock } from 'lucide-react';

export const AdvancedFilters: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // State values from Redux
  const { filters, apiDelay, apiErrorTrigger } = useAppSelector(state => state.dashboard);
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    dispatch(clearFilters());
  };

  const regions = ['All', 'North', 'South', 'East', 'West'];
  const statuses = ['All', 'Active', 'Inactive', 'Pending'];

  return (
    <div className="glass-card p-4 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
            isOpen
              ? 'bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Filter size={15} />
          <span>{t('filters.title')}</span>
          {isOpen ? <X size={13} className="ml-1" /> : null}
        </button>

        {/* Action Controls for Debugging & Demo */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Simulate Slow API */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5">
            <Clock size={13} className="text-slate-400" />
            <span className="text-[10px] text-slate-550 dark:text-slate-400 font-semibold">Latency:</span>
            <select
              value={apiDelay}
              onChange={(e) => dispatch(setApiDelay(Number(e.target.value)))}
              className="bg-transparent text-[10px] font-bold text-slate-750 dark:text-slate-200 focus:ring-0 border-none p-0 cursor-pointer"
            >
              <option value={0}>0ms (Instant)</option>
              <option value={800}>800ms (Normal)</option>
              <option value={2500}>2500ms (Slow)</option>
            </select>
          </div>

          {/* Trigger API Error */}
          <button
            onClick={() => dispatch(toggleApiErrorTrigger())}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-bold transition-all ${
              apiErrorTrigger
                ? 'bg-rose-50 dark:bg-rose-950/25 border-rose-250 text-rose-500'
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-200/50 dark:hover:bg-slate-800'
            }`}
            title="Simulate Server Error to view reusable Error boundary state"
          >
            <AlertTriangle size={13} />
            <span>Simulate Error</span>
          </button>

          {/* Manual Refresh */}
          <button
            onClick={() => dispatch(triggerRefresh())}
            className="p-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl transition-all"
            title="Force query refresh"
          >
            <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Expandable filters section */}
      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 animate-fade-in text-xs font-semibold text-slate-500 dark:text-slate-400">
          
          {/* 1. Date Range Start */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-450 dark:text-slate-500">
              {t('filters.startDate')}
            </label>
            <input
              type="date"
              value={filters.dateRange.startDate}
              onChange={(e) => dispatch(setDateRange({ ...filters.dateRange, startDate: e.target.value }))}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-2 px-3 rounded-xl text-slate-700 dark:text-slate-200 text-xs"
            />
          </div>

          {/* 2. Date Range End */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-450 dark:text-slate-500">
              {t('filters.endDate')}
            </label>
            <input
              type="date"
              value={filters.dateRange.endDate}
              onChange={(e) => dispatch(setDateRange({ ...filters.dateRange, endDate: e.target.value }))}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-2 px-3 rounded-xl text-slate-700 dark:text-slate-200 text-xs"
            />
          </div>

          {/* 3. Revenue Range Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-450 dark:text-slate-500">
              Revenue (Min / Max)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.revenueRange.min}
                onChange={(e) => dispatch(setRevenueRange({ ...filters.revenueRange, min: Number(e.target.value) }))}
                placeholder="Min"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-2 px-3 rounded-xl text-slate-700 dark:text-slate-200 text-xs"
              />
              <span className="text-slate-400 font-bold">-</span>
              <input
                type="number"
                value={filters.revenueRange.max}
                onChange={(e) => dispatch(setRevenueRange({ ...filters.revenueRange, max: Number(e.target.value) }))}
                placeholder="Max"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-2 px-3 rounded-xl text-slate-700 dark:text-slate-200 text-xs"
              />
            </div>
          </div>

          {/* 4. Region Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-450 dark:text-slate-500">
              {t('filters.region')}
            </label>
            <select
              value={filters.region}
              onChange={(e) => dispatch(setRegionFilter(e.target.value))}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-2 px-3 rounded-xl text-slate-700 dark:text-slate-200 text-xs cursor-pointer"
            >
              {regions.map(r => (
                <option key={r} value={r}>
                  {r === 'All' ? t('table.allRegions') : r}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Status Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-slate-450 dark:text-slate-500">
              {t('filters.status')}
            </label>
            <select
              value={filters.status}
              onChange={(e) => dispatch(setStatusFilter(e.target.value))}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-2 px-3 rounded-xl text-slate-700 dark:text-slate-200 text-xs cursor-pointer"
            >
              {statuses.map(s => (
                <option key={s} value={s}>
                  {s === 'All' ? t('table.allStatuses') : t(`table.${s.toLowerCase()}`)}
                </option>
              ))}
            </select>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Clear Button */}
          <div className="flex items-end justify-end mt-4">
            <button
              onClick={handleClear}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all active:scale-95"
            >
              {t('filters.clear')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdvancedFilters;
