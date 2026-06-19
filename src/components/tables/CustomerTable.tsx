import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { api } from '../../services/api';
import type { Customer } from '../../types';
import { 
  setSearchQuery, 
  setSort, 
  setPage, 
  setPageSize, 
  setSelectedCustomer 
} from '../../redux/slices/customerSlice';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  Eye,
  FileSpreadsheet,
  X
} from 'lucide-react';
import SkeletonLoader from '../common/SkeletonLoader';
import ErrorComponent from '../common/ErrorComponent';
import EmptyState from '../common/EmptyState';
import { exportToCsv } from '../../utils/exportCsv';

export const CustomerTable: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const isUrdu = i18n.language === 'ur';

  // Select states from Redux
  const { searchQuery, sortBy, sortOrder, page, pageSize, selectedCustomer } = useAppSelector(state => state.customers);
  const { filters, apiDelay, apiErrorTrigger } = useAppSelector(state => state.dashboard);

  // Fetch customers with filtering, sorting, and pagination
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['customers', searchQuery, sortBy, sortOrder, page, pageSize, filters, apiErrorTrigger],
    queryFn: async () => {
      const response = await api.get('/api/customers', {
        params: {
          q: searchQuery,
          _sort: sortBy,
          _order: sortOrder,
          _page: page,
          _limit: pageSize,
          region: filters.region,
          status: filters.status,
          minRevenue: filters.revenueRange.min,
          maxRevenue: filters.revenueRange.max
        },
        headers: {
          'x-simulate-error': String(apiErrorTrigger),
          'x-api-delay': String(apiDelay)
        }
      });
      
      const totalCount = Number(response.headers['x-total-count']) || 0;
      return {
        customers: response.data as Customer[],
        totalCount
      };
    }
  });

  // Export full table list as CSV
  const handleCsvExport = async () => {
    try {
      const res = await api.get('/api/customers', {
        params: {
          region: filters.region,
          status: filters.status,
          minRevenue: filters.revenueRange.min,
          maxRevenue: filters.revenueRange.max
        }
      });
      exportToCsv(res.data, 'customers_data_report.csv');
    } catch (e) {
      alert('CSV Export failed.');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSort = (field: keyof Customer) => {
    const isAsc = sortBy === field && sortOrder === 'asc';
    dispatch(setSort({
      sortBy: field,
      sortOrder: isAsc ? 'desc' : 'asc'
    }));
  };

  const renderSortIcon = (field: keyof Customer) => {
    if (sortBy !== field) return <ArrowUpDown size={12} className="text-slate-400 group-hover:text-slate-650" />;
    return sortOrder === 'asc' 
      ? <ArrowUp size={12} className="text-violet-600 dark:text-violet-400" />
      : <ArrowDown size={12} className="text-violet-600 dark:text-violet-400" />;
  };

  // Helper for status badge styling
  const getStatusBadge = (status: Customer['status']) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {t('table.active')}
          </span>
        );
      case 'Inactive':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            {t('table.inactive')}
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-505" />
            {t('table.pending')}
          </span>
        );
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(isUrdu ? 'ur-PK' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 0;
  const showFrom = data ? (page - 1) * pageSize + 1 : 0;
  const showTo = data ? Math.min(page * pageSize, data.totalCount) : 0;

  if (error) {
    return <ErrorComponent onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-4">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t('table.search')}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 focus:border-violet-500 transition-all text-slate-700 dark:text-slate-200"
          />
        </div>

        {/* CSV Export Trigger */}
        <button
          onClick={handleCsvExport}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-500/10 active:scale-95"
        >
          <FileSpreadsheet size={16} />
          <span>{t('export.csv')}</span>
        </button>
      </div>

      {isLoading ? (
        <SkeletonLoader type="table" rows={pageSize} />
      ) : !data || data.customers.length === 0 ? (
        <EmptyState onClearFilters={() => dispatch(setSearchQuery(''))} />
      ) : (
        <div className="glass-card overflow-hidden border border-slate-200 dark:border-slate-800/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 text-slate-450 dark:text-slate-500 uppercase tracking-wider font-bold">
                  {/* Customer Name Sortable */}
                  <th 
                    onClick={() => handleSort('name')}
                    className="px-6 py-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-850 select-none group"
                  >
                    <div className="flex items-center gap-1.5 justify-start">
                      <span>{t('table.customerName')}</span>
                      {renderSortIcon('name')}
                    </div>
                  </th>
                  {/* Revenue Sortable */}
                  <th 
                    onClick={() => handleSort('revenue')}
                    className="px-6 py-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-850 select-none group"
                  >
                    <div className="flex items-center gap-1.5 justify-start">
                      <span>{t('table.revenue')}</span>
                      {renderSortIcon('revenue')}
                    </div>
                  </th>
                  {/* Orders Sortable */}
                  <th 
                    onClick={() => handleSort('orders')}
                    className="px-6 py-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-850 select-none group"
                  >
                    <div className="flex items-center gap-1.5 justify-start">
                      <span>{t('table.orders')}</span>
                      {renderSortIcon('orders')}
                    </div>
                  </th>
                  {/* Region Sortable */}
                  <th 
                    onClick={() => handleSort('region')}
                    className="px-6 py-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-850 select-none group"
                  >
                    <div className="flex items-center gap-1.5 justify-start">
                      <span>{t('table.region')}</span>
                      {renderSortIcon('region')}
                    </div>
                  </th>
                  {/* Status */}
                  <th className="px-6 py-4">{t('table.status')}</th>
                  {/* Actions */}
                  <th className="px-6 py-4 text-center">{t('table.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {data.customers.map((c) => (
                  <tr 
                    key={c.id} 
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors"
                  >
                    {/* Name & Email */}
                    <td className="px-6 py-4.5">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</p>
                        <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5 font-medium">{c.email}</p>
                      </div>
                    </td>
                    {/* Revenue */}
                    <td className="px-6 py-4.5 font-bold text-slate-800 dark:text-slate-200">
                      {formatCurrency(c.revenue)}
                    </td>
                    {/* Orders */}
                    <td className="px-6 py-4.5 font-medium">
                      {c.orders}
                    </td>
                    {/* Region */}
                    <td className="px-6 py-4.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-350">
                        {c.region}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-6 py-4.5">
                      {getStatusBadge(c.status)}
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4.5 text-center">
                      <button
                        onClick={() => dispatch(setSelectedCustomer(c))}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-violet-600 transition-colors"
                        title="View Customer Profile"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="px-6 py-4.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div>
              {t('table.showing')} <span className="text-slate-800 dark:text-slate-200 font-bold">{showFrom}</span> {t('table.to')} <span className="text-slate-800 dark:text-slate-200 font-bold">{showTo}</span> {t('table.of')} <span className="text-slate-800 dark:text-slate-200 font-bold">{data.totalCount}</span> {t('table.entries')}
            </div>

            <div className="flex items-center gap-3">
              {/* Page size select */}
              <div className="flex items-center gap-2">
                <span>Page Size:</span>
                <select
                  value={pageSize}
                  onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 py-1 px-2.5 rounded-lg text-slate-700 dark:text-slate-200 text-xs focus:ring-1 focus:ring-violet-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-1">
                <button
                  disabled={page === 1}
                  onClick={() => dispatch(setPage(page - 1))}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    const isCurrent = pageNum === page;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => dispatch(setPage(pageNum))}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          isCurrent 
                            ? 'bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md' 
                            : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  disabled={page === totalPages}
                  onClick={() => dispatch(setPage(page + 1))}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Details Slide Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Drawer backdrop overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => dispatch(setSelectedCustomer(null))}
          />
          {/* Drawer content block */}
          <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl p-6 flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-slide-left z-10 text-slate-800 dark:text-slate-100">
            <div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Customer Profile</h3>
                <button 
                  onClick={() => dispatch(setSelectedCustomer(null))}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Profile Details */}
              <div className="space-y-6 mt-6">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white text-2xl font-black mb-3 shadow-md shadow-violet-500/10">
                    {selectedCustomer.name.substring(0, 2).toUpperCase()}
                  </div>
                  <h4 className="text-lg font-black">{selectedCustomer.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{selectedCustomer.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-950/30 p-3 rounded-xl">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Total Revenue</span>
                    <span className="text-base font-black text-slate-900 dark:text-white mt-1 block">{formatCurrency(selectedCustomer.revenue)}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/30 p-3 rounded-xl">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Total Orders</span>
                    <span className="text-base font-black text-slate-900 dark:text-white mt-1 block">{selectedCustomer.orders}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/30 p-3 rounded-xl">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Geographic Region</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1 block">{selectedCustomer.region}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/30 p-3 rounded-xl">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Relationship Status</span>
                    <span className="mt-1 block">{getStatusBadge(selectedCustomer.status)}</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/30 p-4 rounded-xl space-y-2.5 text-xs text-slate-650 dark:text-slate-350">
                  <div className="flex justify-between">
                    <span>Joined Date:</span>
                    <span className="font-bold font-mono">{selectedCustomer.joinedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>System Account ID:</span>
                    <span className="font-bold font-mono">USR-{selectedCustomer.id.padStart(5, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Support Level:</span>
                    <span className="font-bold text-violet-600 dark:text-violet-400">Enterprise SLA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex gap-3">
              <button
                onClick={() => dispatch(setSelectedCustomer(null))}
                className="w-full py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl text-xs font-bold transition-all text-slate-755 dark:text-slate-300 active:scale-95"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CustomerTable;
