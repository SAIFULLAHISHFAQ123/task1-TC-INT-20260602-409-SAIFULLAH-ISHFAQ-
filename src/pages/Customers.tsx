import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomerTable } from '../components/tables/CustomerTable';
import { AdvancedFilters } from '../components/common/AdvancedFilters';

export const Customers: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {t('nav.customers')}
        </h2>
        <p className="text-xs text-slate-450 dark:text-slate-500 mt-1">
          Review, sort, search, and export detailed corporate customer statistics.
        </p>
      </div>

      {/* Advanced Global Filters */}
      <AdvancedFilters />

      {/* Main Customers Table */}
      <CustomerTable />
    </div>
  );
};
export default Customers;
