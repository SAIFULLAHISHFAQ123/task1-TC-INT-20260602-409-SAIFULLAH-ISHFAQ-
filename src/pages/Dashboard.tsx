import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../redux/store';
import { api } from '../services/api';
import type { KpiData, Order } from '../types';
import { KpiCard } from '../components/cards/KpiCard';
import { RevenueTrendChart } from '../components/charts/RevenueTrendChart';
import { CategoryDistributionChart } from '../components/charts/CategoryDistributionChart';
import { AdvancedFilters } from '../components/common/AdvancedFilters';
import SkeletonLoader from '../components/common/SkeletonLoader';
import ErrorComponent from '../components/common/ErrorComponent';
import { Clock } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  // Get active dashboard filters, latency selectors, error triggers from Redux
  const { filters, refreshKey, apiDelay, apiErrorTrigger } = useAppSelector(state => state.dashboard);

  // Fetch KPI Cards
  const { 
    data: kpiData, 
    isLoading: isKpisLoading, 
    error: kpisError, 
    refetch: refetchKpis 
  } = useQuery({
    queryKey: ['kpis', filters, refreshKey, apiErrorTrigger],
    queryFn: async () => {
      const response = await api.get('/api/kpis', {
        params: {
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
      return response.data as KpiData[];
    }
  });

  // Fetch Chart Data
  const { 
    data: chartData, 
    isLoading: isChartsLoading, 
    error: chartsError, 
    refetch: refetchCharts 
  } = useQuery({
    queryKey: ['charts', filters, refreshKey, apiErrorTrigger],
    queryFn: async () => {
      const response = await api.get('/api/charts', {
        params: { region: filters.region },
        headers: {
          'x-simulate-error': String(apiErrorTrigger),
          'x-api-delay': String(apiDelay)
        }
      });
      return response.data;
    }
  });

  const handleRetry = () => {
    refetchKpis();
    refetchCharts();
  };

  const getOrderStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400';
      case 'Processing':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-450';
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(isUrdu ? 'ur-PK' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  if (kpisError || chartsError) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
          {t('nav.dashboard')}
        </h2>
        <ErrorComponent onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-6" id="dashboard-report-root">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pdf-exclude">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('nav.dashboard')}
          </h2>
          <p className="text-xs text-slate-450 dark:text-slate-500 mt-1">
            Monitor real-time business performance parameters.
          </p>
        </div>

        {/* Local time ticker */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl text-[10px] font-semibold text-slate-500 dark:text-slate-400">
          <Clock size={12} />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="pdf-exclude">
        <AdvancedFilters />
      </div>

      {/* KPI Cards Grid */}
      {isKpisLoading ? (
        <SkeletonLoader type="kpi" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {kpiData?.map((kpi) => (
            <KpiCard key={kpi.id} data={kpi} />
          ))}
        </div>
      )}

      {/* Core Visualization Charts */}
      {isChartsLoading ? (
        <SkeletonLoader type="chart" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Area Chart */}
          <div className="lg:col-span-2">
            <RevenueTrendChart data={chartData?.monthlyRevenue || []} />
          </div>

          {/* Category Pie Chart */}
          <div>
            <CategoryDistributionChart data={chartData?.categoryDistribution || []} />
          </div>
        </div>
      )}

      {/* Bottom Row: Recent Orders list */}
      <div className="grid grid-cols-1 gap-6">
        <div className="glass-card p-6 border border-slate-200 dark:border-slate-800/80">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Recent Customer Orders
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Last 8 transactions completed across all active regions.
              </p>
            </div>
            
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-lg font-bold">
              Orders Live Feed
            </span>
          </div>

          {isChartsLoading ? (
            <SkeletonLoader type="list" rows={5} />
          ) : (
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 text-slate-450 dark:text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Product Item</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Transaction Date</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {(chartData?.recentOrders || []).map((o: Order) => (
                    <tr key={o.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-slate-650 dark:text-slate-400">{o.id}</td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{o.customerName}</td>
                      <td className="px-4 py-3">{o.product}</td>
                      <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200">{formatCurrency(o.amount)}</td>
                      <td className="px-4 py-3 font-mono text-slate-500 dark:text-slate-400">{o.date}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${getOrderStatusBadge(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
