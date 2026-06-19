import React from 'react';
import { useTranslation } from 'react-i18next';
import { Inbox, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, onClearFilters }) => {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-10 flex flex-col items-center justify-center text-center max-w-md mx-auto my-8 border-dashed border-2 border-slate-200 dark:border-slate-800">
      <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-4">
        <Inbox size={28} />
      </div>
      <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
        No Matching Records
      </h4>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 max-w-xs leading-relaxed">
        {message || t('common.empty')}
      </p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="mt-5 flex items-center gap-2 px-4 py-2 border border-slate-250 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-300 rounded-xl text-xs font-semibold active:scale-95 transition-all"
        >
          <RotateCcw size={12} />
          <span>{t('filters.clear')}</span>
        </button>
      )}
    </div>
  );
};
export default EmptyState;
