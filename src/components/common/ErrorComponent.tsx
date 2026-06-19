import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({ message, onRetry }) => {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-8 flex flex-col items-center justify-center text-center max-w-md mx-auto my-12 border-rose-200/50 dark:border-rose-950/40 bg-rose-50/10 dark:bg-rose-950/5">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center mb-4 shadow-inner">
        <AlertTriangle size={32} />
      </div>
      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
        Database Sync Interrupted
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm leading-relaxed">
        {message || t('common.error')}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-violet-650/20 hover:opacity-90 active:scale-95 transition-all"
        >
          <RefreshCw size={14} className="animate-spin-hover" />
          <span>{t('common.retry')}</span>
        </button>
      )}
    </div>
  );
};
export default ErrorComponent;
