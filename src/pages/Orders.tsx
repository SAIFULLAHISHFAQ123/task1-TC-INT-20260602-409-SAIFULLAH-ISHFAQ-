import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { Order } from '../types';
import { useAppSelector } from '../redux/store';
import SkeletonLoader from '../components/common/SkeletonLoader';
import ErrorComponent from '../components/common/ErrorComponent';
import { ShoppingBag, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export const Orders: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  const { filters, refreshKey, apiDelay, apiErrorTrigger } = useAppSelector(state => state.dashboard);

  // Fetch orders data
  const { data: chartData, isLoading, error, refetch } = useQuery({
    queryKey: ['orders-data', filters.region, refreshKey, apiErrorTrigger],
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

  if (error) {
    return <ErrorComponent onRetry={() => refetch()} />;
  }

  const ordersList: Order[] = chartData?.recentOrders || [];

  // Calculate quick metrics
  const completedCount = ordersList.filter(o => o.status === 'Completed').length;
  const processingCount = ordersList.filter(o => o.status === 'Processing').length;
  const cancelledCount = ordersList.filter(o => o.status === 'Cancelled').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {t('nav.orders')}
        </h2>
        <p className="text-xs text-slate-450 dark:text-slate-500 mt-1">
          Monitor transactional volume and fulfillment states.
        </p>
      </div>

      {/* Quick Order KPIs */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 skeleton-loading rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/20 text-violet-650 dark:text-violet-400 flex items-center justify-center">
              <ShoppingBag size={20} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Total Orders</span>
              <span className="text-lg font-black text-slate-900 dark:text-white mt-0.5 block">{ordersList.length}</span>
            </div>
          </div>

          <div className="glass-card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle size={20} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Fulfillment rate</span>
              <span className="text-lg font-black text-slate-900 dark:text-white mt-0.5 block">
                {Math.round((completedCount / (ordersList.length || 1)) * 100)}%
              </span>
            </div>
          </div>

          <div className="glass-card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">In Processing</span>
              <span className="text-lg font-black text-slate-900 dark:text-white mt-0.5 block">{processingCount}</span>
            </div>
          </div>

          <div className="glass-card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Cancellations</span>
              <span className="text-lg font-black text-slate-900 dark:text-white mt-0.5 block">{cancelledCount}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main orders table */}
      <div className="glass-card p-6 border border-slate-205 dark:border-slate-800/80">
        <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
          All Transactions Log
        </h3>
        {isLoading ? (
          <SkeletonLoader type="list" rows={6} />
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 text-slate-450 dark:text-slate-500 uppercase tracking-wider font-bold">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Transaction Amount</th>
                  <th className="px-4 py-3 font-mono">Date</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {ordersList.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-slate-550 dark:text-slate-400">{o.id}</td>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{o.customerName}</td>
                    <td className="px-4 py-3">{o.product}</td>
                    <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200">{formatCurrency(o.amount)}</td>
                    <td className="px-4 py-3 font-mono text-slate-500 dark:text-slate-400">{o.date}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-semibold ${getOrderStatusBadge(o.status)}`}>
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
  );
};
export default Orders;
