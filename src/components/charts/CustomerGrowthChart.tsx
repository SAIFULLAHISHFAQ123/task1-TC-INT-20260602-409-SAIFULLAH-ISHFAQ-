import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CustomerGrowth } from '../../types';

interface CustomerGrowthChartProps {
  data: CustomerGrowth[];
  isLoading?: boolean;
}

export const CustomerGrowthChart: React.FC<CustomerGrowthChartProps> = ({ data, isLoading = false }) => {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  const formatCustomers = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return String(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-recharts-tooltip">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">{label}</p>
          <div className="space-y-1 text-xs">
            <p className="font-semibold text-violet-650 dark:text-violet-400">
              {t('charts.totalCustomers')}: {new Intl.NumberFormat(isUrdu ? 'ur-PK' : 'en-US').format(payload[0].value)}
            </p>
            <p className="font-semibold text-pink-500 dark:text-pink-400">
              {t('charts.newCustomers')}: {new Intl.NumberFormat(isUrdu ? 'ur-PK' : 'en-US').format(payload[1].value)}
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
        {t('charts.customerGrowth')}
      </h3>
      <div className="flex-1 w-full text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis 
              dataKey="month" 
              stroke="#94a3b8" 
              tickLine={false} 
              axisLine={false} 
              dy={10} 
            />
            {/* Left Axis for Cumulative Total */}
            <YAxis 
              yAxisId="left"
              tickFormatter={formatCustomers} 
              stroke="#94a3b8" 
              tickLine={false} 
              axisLine={false} 
              dx={-5}
            />
            {/* Right Axis for Monthly New */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              tickFormatter={formatCustomers} 
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
            <Line 
              yAxisId="left"
              name={t('charts.totalCustomers')}
              type="monotone" 
              dataKey="totalCustomers" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 3, fill: '#fff' }}
              activeDot={{ r: 6 }}
            />
            <Line 
              yAxisId="right"
              name={t('charts.newCustomers')}
              type="monotone" 
              dataKey="newCustomers" 
              stroke="#ec4899" 
              strokeWidth={2}
              dot={{ stroke: '#ec4899', strokeWidth: 2, r: 3, fill: '#fff' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
