import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        dashboard: 'Dashboard',
        analytics: 'Analytics',
        customers: 'Customers',
        orders: 'Orders',
        reports: 'Reports',
        settings: 'Settings'
      },
      kpis: {
        revenue: 'Total Revenue',
        customers: 'Total Customers',
        orders: 'Total Orders',
        conversion: 'Conversion Rate',
        growth: 'Monthly Growth'
      },
      charts: {
        revenueTrend: 'Revenue Trend (Actual vs Target)',
        salesComparison: 'Sales Performance (Region / Product)',
        customerGrowth: 'Customer Growth Trend',
        categoryDistribution: 'Customer Segment Distribution',
        actual: 'Actual Revenue',
        target: 'Target Revenue',
        newCustomers: 'New Customers',
        totalCustomers: 'Total Customers',
        sales: 'Sales Units'
      },
      table: {
        customerName: 'Customer Name',
        revenue: 'Revenue',
        orders: 'Orders',
        status: 'Status',
        region: 'Region',
        search: 'Search customers...',
        allRegions: 'All Regions',
        allStatuses: 'All Statuses',
        active: 'Active',
        inactive: 'Inactive',
        pending: 'Pending',
        actions: 'Actions',
        showing: 'Showing',
        to: 'to',
        of: 'of',
        entries: 'entries',
        previous: 'Previous',
        next: 'Next'
      },
      export: {
        pdf: 'Export PDF Report',
        csv: 'Export CSV Data',
        exporting: 'Generating...'
      },
      filters: {
        title: 'Advanced Filters',
        dateRange: 'Date Range',
        minRevenue: 'Min Revenue',
        maxRevenue: 'Max Revenue',
        region: 'Region',
        status: 'Status',
        clear: 'Clear Filters',
        startDate: 'Start Date',
        endDate: 'End Date'
      },
      common: {
        loading: 'Loading dashboard data...',
        error: 'Failed to load data. Please check your connection.',
        empty: 'No data matching selected filters.',
        profile: 'User Profile',
        notifications: 'Notifications',
        search: 'Search everything...',
        retry: 'Retry',
        success: 'Success',
        english: 'English',
        urdu: 'اردو'
      },
      settingsPage: {
        title: 'Settings',
        theme: 'Theme Management',
        light: 'Light Mode',
        dark: 'Dark Mode',
        language: 'Language Settings',
        profileSec: 'Admin Profile Information',
        name: 'Full Name',
        email: 'Email Address',
        role: 'Role',
        save: 'Save Settings',
        saved: 'Settings saved successfully!'
      }
    }
  },
  ur: {
    translation: {
      nav: {
        dashboard: 'ڈیش بورڈ',
        analytics: 'تجزیات',
        customers: 'صارفین',
        orders: 'آرڈرز',
        reports: 'رپورٹس',
        settings: 'ترتیبات'
      },
      kpis: {
        revenue: 'کل آمدنی',
        customers: 'کل صارفین',
        orders: 'کل آرڈرز',
        conversion: 'تبدیلی کی شرح',
        growth: 'ماہانہ ترقی'
      },
      charts: {
        revenueTrend: 'آمدنی کا رجحان (اصل بمقابلہ ہدف)',
        salesComparison: 'فروخت کی کارکردگی (علاقہ / مصنوعات)',
        customerGrowth: 'صارفین کی ترقی کا رجحان',
        categoryDistribution: 'صارفین کے طبقہ کی تقسیم',
        actual: 'اصل آمدنی',
        target: 'ہدف آمدنی',
        newCustomers: 'نئے صارفین',
        totalCustomers: 'کل صارفین',
        sales: 'فروخت کی اکائیاں'
      },
      table: {
        customerName: 'صارف کا نام',
        revenue: 'آمدنی',
        orders: 'آرڈرز',
        status: 'حالت',
        region: 'علاقہ',
        search: 'صارفین تلاش کریں...',
        allRegions: 'تمام علاقے',
        allStatuses: 'تمام حالتیں',
        active: 'فعال',
        inactive: 'غیر فعال',
        pending: 'زیر التواء',
        actions: 'اقدامات',
        showing: 'دکھایا جا رہا ہے',
        to: 'سے',
        of: 'میں سے',
        entries: 'اندراجات',
        previous: 'پچھلا',
        next: 'اگلا'
      },
      export: {
        pdf: 'پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں',
        csv: 'سی ایس وی ڈیٹا ڈاؤن لوڈ کریں',
        exporting: 'تخلیق ہو رہا ہے...'
      },
      filters: {
        title: 'جدید فلٹرز',
        dateRange: 'تاریخ کی حد',
        minRevenue: 'کم از کم آمدنی',
        maxRevenue: 'زیادہ سے زیادہ آمدنی',
        region: 'علاقہ',
        status: 'حالت',
        clear: 'فلٹرز صاف کریں',
        startDate: 'شروع کرنے کی تاریخ',
        endDate: 'ختم ہونے کی تاریخ'
      },
      common: {
        loading: 'ڈیش بورڈ ڈیٹا لوڈ ہو رہا ہے...',
        error: 'ڈیٹا لوڈ کرنے میں ناکامی۔ براہ کرم اپنا کنکشن چیک کریں۔',
        empty: 'منتخب کردہ فلٹرز کے مطابق کوئی ڈیٹا نہیں ملا۔',
        profile: 'صارف کا پروفائل',
        notifications: 'اطلاعات',
        search: 'سب کچھ تلاش کریں...',
        retry: 'دوبارہ کوشش کریں',
        success: 'کامیابی',
        english: 'English',
        urdu: 'اردو'
      },
      settingsPage: {
        title: 'ترتیبات',
        theme: 'تھیم مینجمنٹ',
        light: 'لائٹ موڈ',
        dark: 'ڈارک موڈ',
        language: 'زبان کی ترتیبات',
        profileSec: 'ایڈمن پروفائل کی معلومات',
        name: 'پورا نام',
        email: 'ای میل ایڈریس',
        role: 'عہدہ',
        save: 'ترتیبات محفوظ کریں',
        saved: 'ترتیبات کامیابی سے محفوظ ہو گئیں!'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Handle text direction based on selected language
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ur' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  // Apply fonts for urdu
  if (lng === 'ur') {
    document.documentElement.classList.add('font-urdu');
  } else {
    document.documentElement.classList.remove('font-urdu');
  }
});

// Initial load check
const initialLng = i18n.language || 'en';
document.documentElement.dir = initialLng.startsWith('ur') ? 'rtl' : 'ltr';
document.documentElement.lang = initialLng;
if (initialLng.startsWith('ur')) {
  document.documentElement.classList.add('font-urdu');
}

export default i18n;
