import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SalesByProduct } from '../../types';

interface SalesComparisonChartProps {
  data: SalesByProduct[];
  isLoading?: boolean;
}

export const SalesComparisonChart: React.FC<SalesComparisonChartProps> = ({ data, isLoading = false }) => {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  const formatRevenue = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-recharts-tooltip">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">{label}</p>
          <div className="space-y-1 text-xs">
            <p className="font-semibold text-indigo-650 dark:text-indigo-400">
              {t('table.revenue')}: {new Intl.NumberFormat(isUrdu ? 'ur-PK' : 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(payload[0].value)}
            </p>
            <p className="font-semibold text-emerald-500 dark:text-emerald-450">
              {t('charts.sales')}: {new Intl.NumberFormat(isUrdu ? 'ur-PK' : 'en-US').format(payload[1].value)} units
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6 h-[320px] flex flex-col justify-between skeleton-loading border-none" />
    );
  }

  return (
    <div className="glass-card p-6 h-[320px] flex flex-col">
      <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
        {t('charts.salesComparison')}
      </h3>
      <div className="flex-1 w-full text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis 
              dataKey="product" 
              stroke="#94a3b8" 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            {/* Left YAxis for Revenue */}
            <YAxis 
              yAxisId="left"
              tickFormatter={formatRevenue}
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            {/* Right YAxis for Unit Sales */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              dx={5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', fontWeight: 500, paddingBottom: '10px' }}
            />
            <Bar 
              yAxisId="left"
              name={t('table.revenue')} 
              dataKey="revenue" 
              fill="#4f46e5" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={30}
            />
            <Bar 
              yAxisId="right"
              name={t('charts.sales')} 
              dataKey="sales" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
