export interface KpiData {
  id: string;
  titleKey: string; // Translation key, e.g. 'kpis.revenue'
  value: number;
  format: 'currency' | 'number' | 'percentage';
  change: number; // e.g. 12.4
  trend: 'up' | 'down' | 'neutral';
}

export interface MonthlyRevenue {
  month: string;
  actual: number;
  target: number;
  orders: number;
}

export interface SalesByRegion {
  region: string;
  sales: number;
  revenue: number;
}

export interface SalesByProduct {
  product: string;
  sales: number;
  revenue: number;
}

export interface CustomerGrowth {
  month: string;
  newCustomers: number;
  totalCustomers: number;
}

export interface CategoryDistribution {
  category: string;
  value: number; // e.g. percentage or amount
  color?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  revenue: number;
  orders: number;
  status: 'Active' | 'Inactive' | 'Pending';
  region: 'North' | 'South' | 'East' | 'West';
  joinedDate: string;
}

export interface Order {
  id: string;
  customerName: string;
  product: string;
  amount: number;
  status: 'Completed' | 'Processing' | 'Cancelled';
  date: string;
}

export interface DashboardFilters {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  revenueRange: {
    min: number;
    max: number;
  };
  region: string; // 'All' or specific region
  status: string; // 'All' or active/inactive/pending
}

export interface DashboardState {
  filters: DashboardFilters;
  loading: boolean;
  error: string | null;
}
