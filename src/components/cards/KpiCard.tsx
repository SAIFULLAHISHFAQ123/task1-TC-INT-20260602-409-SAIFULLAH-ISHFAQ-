import React from 'react';
import { useTranslation } from 'react-i18next';
import type { KpiData } from '../../types';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import * as Icons from 'lucide-react';

interface KpiCardProps {
  data: KpiData;
  isLoading?: boolean;
}

// Map string representation to Lucide Icons dynamically
const getIcon = (id: string) => {
  switch (id) {
    case 'revenue':
      return Icons.DollarSign;
    case 'customers':
      return Icons.Users;
    case 'orders':
      return Icons.ShoppingCart;
    case 'conversion':
      return Icons.Percent;
    case 'growth':
      return Icons.TrendingUp;
    default:
      return Icons.Activity;
  }
};

// Generates simple SVG sparkline path values for premium KPI aesthetics
const getSparklinePath = (id: string): string => {
  const sparks: Record<string, string> = {
    revenue: 'M0,15 Q10,5 20,12 T40,4 T65,15 T80,2 T100,8',
    customers: 'M0,15 Q10,12 20,8 T40,10 T65,5 T80,4 T100,2',
    orders: 'M0,18 Q10,15 20,10 T40,15 T65,8 T80,2 T100,4',
    conversion: 'M0,12 Q10,10 20,12 T40,8 T65,12 T80,8 T100,10',
    growth: 'M0,4 Q10,8 20,5 T40,12 T65,8 T80,18 T100,15', // downward trend
  };
  return sparks[id] || 'M0,10 L100,10';
};

export const KpiCard: React.FC<KpiCardProps> = ({ data, isLoading = false }) => {
  const { t, i18n } = useTranslation();
  const IconComponent = getIcon(data.id);
  const isUrdu = i18n.language === 'ur';

  // Format metric value elegantly
  const formatValue = (val: number, format: string) => {
    if (format === 'currency') {
      return new Intl.NumberFormat(isUrdu ? 'ur-PK' : 'en-US', {
        style: 'currency',
        currency: isUrdu ? 'PKR' : 'USD',
        maximumFractionDigits: 0
      }).format(val);
    }
    if (format === 'percentage') {
      return `${val.toFixed(2)}%`;
    }
    return new Intl.NumberFormat(isUrdu ? 'ur-PK' : 'en-US').format(val);
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6 flex flex-col justify-between h-36 skeleton-loading border-none" />
    );
  }

  const isUp = data.trend === 'up';
  const isDown = data.trend === 'down';

  const trendBg = isUp 
    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
    : isDown 
    ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400' 
    : 'bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-400';

  const trendIcon = isUp 
    ? <ArrowUpRight size={14} className="flex-shrink-0" /> 
    : isDown 
    ? <ArrowDownRight size={14} className="flex-shrink-0" /> 
    : <Minus size={14} className="flex-shrink-0" />;

  const sparklineColor = isUp ? '#10b981' : isDown ? '#f43f5e' : '#64748b';

  return (
    <div className="glass-card glass-card-hover p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group">
      
      {/* Top section: Icon and Trend indicator */}
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-violet-600/10">
          <IconComponent size={22} className="transition-transform group-hover:scale-110" />
        </div>
        
        {/* Trend Indicator */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${trendBg}`}>
          {trendIcon}
          <span dir="ltr">{data.change > 0 ? `+${data.change}` : data.change}%</span>
        </div>
      </div>

      {/* Main Metric Output */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {t(data.titleKey)}
          </p>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            {formatValue(data.value, data.format)}
          </h3>
        </div>

        {/* Sparkline decoration */}
        <div className="w-20 h-10 flex items-center justify-center opacity-60 dark:opacity-40 group-hover:opacity-100 transition-opacity">
          <svg className="w-full h-full" viewBox="0 0 100 20">
            <path
              d={getSparklinePath(data.id)}
              fill="none"
              stroke={sparklineColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Hover visual accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-350" />
    </div>
  );
};
