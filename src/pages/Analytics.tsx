import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../redux/store';
import { api } from '../services/api';
import { RevenueTrendChart } from '../components/charts/RevenueTrendChart';
import { SalesComparisonChart } from '../components/charts/SalesComparisonChart';
import { CustomerGrowthChart } from '../components/charts/CustomerGrowthChart';
import { CategoryDistributionChart } from '../components/charts/CategoryDistributionChart';
import { AdvancedFilters } from '../components/common/AdvancedFilters';
import SkeletonLoader from '../components/common/SkeletonLoader';
import ErrorComponent from '../components/common/ErrorComponent';
import { TrendingUp, Award, BarChart3, HelpCircle } from 'lucide-react';

export const Analytics: React.FC = () => {
  const { t } = useTranslation();
  const { filters, refreshKey, apiDelay, apiErrorTrigger } = useAppSelector(state => state.dashboard);

  // Fetch Chart Data
  const { 
    data: chartData, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['analytics-charts', filters.region, refreshKey, apiErrorTrigger],
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

  if (error) {
    return <ErrorComponent onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('nav.analytics')}
          </h2>
          <p className="text-xs text-slate-450 dark:text-slate-500 mt-1">
            Perform in-depth visualization analysis on revenue trends, region performance, and user segmentation.
          </p>
        </div>
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters />

      {isLoading ? (
        <SkeletonLoader type="chart" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend Area Chart */}
          <RevenueTrendChart data={chartData?.monthlyRevenue || []} />

          {/* Sales Performance Bar Chart */}
          <SalesComparisonChart data={chartData?.salesByProduct || []} />

          {/* Customer Growth Line Chart */}
          <CustomerGrowthChart data={chartData?.customerGrowth || []} />

          {/* Customer Segment Distribution Donut Chart */}
          <CategoryDistributionChart data={chartData?.categoryDistribution || []} />
        </div>
      )}

      {/* Analytics Insights */}
      <div className="glass-card p-6 border border-slate-205 dark:border-slate-800/80">
        <h4 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <BarChart3 size={16} />
          Executive Analytics Insights
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/20 text-violet-650 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={18} />
            </div>
            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-200">Revenue Performance</h5>
              <p className="text-slate-450 dark:text-slate-400 mt-1 leading-relaxed">
                Actual revenue outpaced targets by 14% this quarter, driven by enterprise renewals and upgrades in SaaS subscriptions.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Award size={18} />
            </div>
            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-200">Top Growth Markets</h5>
              <p className="text-slate-450 dark:text-slate-400 mt-1 leading-relaxed">
                The East region remains the primary revenue driver, contributing 36% of sales, while the North region shows the highest expansion rate at 18.5%.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
              <HelpCircle size={18} />
            </div>
            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-200">Customer Retention</h5>
              <p className="text-slate-450 dark:text-slate-400 mt-1 leading-relaxed">
                Individual and SMB clients have experienced a 4% attrition. It is recommended to expand targeted support plans for these tiers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
