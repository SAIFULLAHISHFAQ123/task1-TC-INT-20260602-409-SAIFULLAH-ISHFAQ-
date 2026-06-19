import React from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CategoryDistribution } from '../../types';

interface CategoryDistributionChartProps {
  data: CategoryDistribution[];
  isLoading?: boolean;
}

export const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({ data, isLoading = false }) => {
  const { t } = useTranslation();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-recharts-tooltip">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            {payload[0].name}: <span className="font-extrabold text-violet-650 dark:text-violet-400">{payload[0].value}%</span>
          </p>
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

  // Pre-configured elegant palettes
  const defaultColors = ['#6366f1', '#a855f7', '#22c55e', '#f59e0b'];

  return (
    <div className="glass-card p-6 h-[320px] flex flex-col">
      <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
        {t('charts.categoryDistribution')}
      </h3>
      <div className="flex-1 w-full text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              nameKey="category"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || defaultColors[index % defaultColors.length]} 
                />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', fontWeight: 500, paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default CategoryDistributionChart;
