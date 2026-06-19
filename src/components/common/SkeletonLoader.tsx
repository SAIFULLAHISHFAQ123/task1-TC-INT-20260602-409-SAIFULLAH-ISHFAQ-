import React from 'react';

interface SkeletonLoaderProps {
  type?: 'kpi' | 'chart' | 'table' | 'list';
  rows?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'kpi', rows = 5 }) => {
  if (type === 'kpi') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="glass-card p-6 h-36 skeleton-loading border-none" />
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 h-[320px] skeleton-loading border-none" />
        <div className="glass-card p-6 h-[320px] skeleton-loading border-none" />
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="glass-card p-6 flex flex-col space-y-4">
        {/* Table Toolbar Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-9 w-64 skeleton-loading rounded-xl border-none" />
          <div className="h-9 w-48 skeleton-loading rounded-xl border-none" />
        </div>
        {/* Table Rows Skeleton */}
        <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 skeleton-loading border-none" />
          {[...Array(rows)].map((_, i) => (
            <div 
              key={i} 
              className="h-14 w-full border-t border-slate-100 dark:border-slate-800 skeleton-loading border-none opacity-80" 
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
        {/* Table Footer Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-36 skeleton-loading rounded-lg border-none" />
          <div className="h-8 w-48 skeleton-loading rounded-lg border-none" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="h-12 w-full skeleton-loading rounded-xl border-none" />
      ))}
    </div>
  );
};
export default SkeletonLoader;
