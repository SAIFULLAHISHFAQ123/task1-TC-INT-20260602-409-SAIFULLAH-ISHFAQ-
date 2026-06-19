import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../redux/store';
import { api } from '../services/api';
import type { KpiData, Customer } from '../types';
import { exportDashboardToPdf } from '../utils/exportPdf';
import { exportToCsv } from '../utils/exportCsv';
import SkeletonLoader from '../components/common/SkeletonLoader';
import ErrorComponent from '../components/common/ErrorComponent';
import { FileText, FileSpreadsheet, Download, RefreshCw, CheckCircle } from 'lucide-react';

export const Reports: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';
  const isDark = useAppSelector(state => state.theme.mode) === 'dark';

  const { filters, refreshKey, apiDelay, apiErrorTrigger } = useAppSelector(state => state.dashboard);
  const [exporting, setExporting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch report summary KPIs
  const { data: kpiData, isLoading: isKpisLoading, error: kpisError, refetch: refetchKpis } = useQuery({
    queryKey: ['reports-kpis', filters, refreshKey, apiErrorTrigger],
    queryFn: async () => {
      const response = await api.get('/api/kpis', {
        params: {
          region: filters.region,
          status: filters.status,
          minRevenue: filters.revenueRange.min,
          maxRevenue: filters.revenueRange.max
        },
        headers: {
          'x-simulate-error': String(apiErrorTrigger),
          'x-api-delay': String(apiDelay)
        }
      });
      return response.data as KpiData[];
    }
  });

  const handlePdfExport = async () => {
    setExporting(true);
    setSuccessMsg('');
    try {
      // Trigger html2canvas/jspdf print compilation
      await exportDashboardToPdf(
        'report-compile-container', 
        'teyzix_core_analytics_report.pdf',
        isDark
      );
      setSuccessMsg('PDF Report downloaded successfully.');
    } catch (e) {
      alert('PDF Generation failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleCsvExport = async () => {
    try {
      const res = await api.get('/api/customers', {
        params: {
          region: filters.region,
          status: filters.status,
          minRevenue: filters.revenueRange.min,
          maxRevenue: filters.revenueRange.max
        }
      });
      exportToCsv(res.data as Customer[], 'teyzix_customers_data.csv');
    } catch (e) {
      alert('CSV Export failed.');
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(isUrdu ? 'ur-PK' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  if (kpisError) {
    return <ErrorComponent onRetry={() => refetchKpis()} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {t('nav.reports')}
        </h2>
        <p className="text-xs text-slate-450 dark:text-slate-500 mt-1">
          Compile business intelligence metrics and download them in PDF or CSV formats.
        </p>
      </div>

      {/* Export Actions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* PDF Export Card */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-4 border border-slate-205 dark:border-slate-800/80">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/20 text-violet-650 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Executive PDF Compilation</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Generate a high-DPI document layout containing active KPI indicators, charts representation, and orders feed.
              </p>
            </div>
          </div>
          <button
            onClick={handlePdfExport}
            disabled={exporting || isKpisLoading}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-650 hover:opacity-90 text-white text-xs font-bold rounded-xl shadow-lg shadow-violet-500/10 disabled:opacity-50 transition-all active:scale-95"
          >
            {exporting ? (
              <>
                <RefreshCw size={15} className="animate-spin" />
                <span>{t('export.exporting')}</span>
              </>
            ) : (
              <>
                <Download size={15} />
                <span>{t('export.pdf')}</span>
              </>
            )}
          </button>
        </div>

        {/* CSV Export Card */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-4 border border-slate-205 dark:border-slate-800/80">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <FileSpreadsheet size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Customer Records CSV Spreadsheet</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Download a comma-separated values file representing active customer records configured under current filtration.
              </p>
            </div>
          </div>
          <button
            onClick={handleCsvExport}
            disabled={isKpisLoading}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/10 transition-all active:scale-95"
          >
            <Download size={15} />
            <span>{t('export.csv')}</span>
          </button>
        </div>

      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl flex items-center gap-2.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
          <CheckCircle size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Compiled Document Preview Box */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-950/40 p-4 sm:p-8">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Compiled Report Layout Preview</h4>
        
        {isKpisLoading ? (
          <SkeletonLoader type="table" rows={6} />
        ) : (
          <div 
            id="report-compile-container" 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto space-y-8 text-slate-800 dark:text-slate-100 transition-all duration-300"
          >
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-slate-150 dark:border-slate-800 pb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-violet-600 dark:text-violet-400 tracking-wider">TEYZIX CORE INTERNSHIP PROGRAM</span>
                <h3 className="text-xl font-black mt-1">Executive Analytics Dashboard Report</h3>
                <p className="text-[10px] text-slate-400 mt-1">Date: {new Date().toLocaleDateString()} | Time: {new Date().toLocaleTimeString()}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">FEWD-1</span>
                <p className="text-[9px] text-slate-450 uppercase tracking-wider font-bold mt-1">Status: Compiled</p>
              </div>
            </div>

            {/* Configured Filters Summary */}
            <div className="bg-slate-50 dark:bg-slate-950/30 p-4 rounded-xl text-xs grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase block">Region Filter:</span>
                <span className="font-bold text-slate-800 dark:text-slate-250 mt-0.5 block">{filters.region}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase block">Status Filter:</span>
                <span className="font-bold text-slate-800 dark:text-slate-250 mt-0.5 block">{filters.status}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase block">Revenue Range:</span>
                <span className="font-bold text-slate-800 dark:text-slate-250 mt-0.5 block">${filters.revenueRange.min} - ${filters.revenueRange.max}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase block">Target Date Range:</span>
                <span className="font-bold text-slate-800 dark:text-slate-250 mt-0.5 block font-mono text-[10px]">{filters.dateRange.startDate} / {filters.dateRange.endDate}</span>
              </div>
            </div>

            {/* Summarized KPIs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {kpiData?.slice(0, 3).map((item) => (
                <div key={item.id} className="border border-slate-100 dark:border-slate-800 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wide">{t(item.titleKey)}</span>
                  <p className="text-xl font-black text-slate-900 dark:text-white mt-1.5">{formatCurrency(item.value)}</p>
                  <span className={`text-[10px] font-bold block mt-1 ${item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {item.change > 0 ? `+${item.change}` : item.change}% compared to baseline
                  </span>
                </div>
              ))}
            </div>

            {/* compiled summary charts */}
            <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 space-y-4">
              <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Compiled KPI Summary</h5>
              <div className="text-xs space-y-2 text-slate-650 dark:text-slate-350">
                <p>• Net business billing and sales transactions successfully processed matches system target metrics.</p>
                <p>• Data streams compiled for active clients within designated regional sectors check out correctly.</p>
              </div>
            </div>

            {/* signature block */}
            <div className="flex justify-between items-center pt-8 border-t border-slate-150 dark:border-slate-800 text-[10px] text-slate-400">
              <span>Report compiled by Teyzix Architect Subsystem</span>
              <span className="font-bold uppercase tracking-widest text-violet-650 dark:text-violet-400">SECURE DIGITAL SIGNATURE</span>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
export default Reports;
