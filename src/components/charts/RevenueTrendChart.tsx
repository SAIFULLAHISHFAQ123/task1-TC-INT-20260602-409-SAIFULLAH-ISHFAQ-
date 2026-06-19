import React from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MonthlyRevenue } from '../../types';

interface RevenueTrendChartProps {
  data: MonthlyRevenue[];
  isLoading?: boolean;
}

export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data, isLoading = false }) => {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  // Format currency helper inside chart axes
  const formatYAxis = (value: number) => {
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
            <p className="font-semibold text-violet-600 dark:text-violet-400">
              {t('charts.actual')}: {new Intl.NumberFormat(isUrdu ? 'ur-PK' : 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(payload[0].value)}
            </p>
            <p className="font-semibold text-slate-500 dark:text-slate-400">
              {t('charts.target')}: {new Intl.NumberFormat(isUrdu ? 'ur-PK' : 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(payload[1].value)}
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
        {t('charts.revenueTrend')}
      </h3>
      <div className="flex-1 w-full text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis 
              dataKey="month" 
              stroke="#94a3b8" 
              tickLine={false} 
              axisLine={false} 
              dy={10} 
            />
            <YAxis 
              tickFormatter={formatYAxis} 
              stroke="#94a3b8" 
              tickLine={false} 
              axisLine={false} 
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', fontWeight: 500, paddingBottom: '10px' }}
            />
            <Area 
              name={t('charts.actual')}
              type="monotone" 
              dataKey="actual" 
              stroke="#7c3aed" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorActual)" 
            />
            <Area 
              name={t('charts.target')}
              type="monotone" 
              dataKey="target" 
              stroke="#94a3b8" 
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1} 
              fill="url(#colorTarget)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
