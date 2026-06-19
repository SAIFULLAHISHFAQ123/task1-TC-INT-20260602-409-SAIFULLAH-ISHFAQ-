import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { mockMonthlyRevenue, mockSalesByRegion, mockSalesByProduct, mockCustomerGrowth, mockCategoryDistribution, mockCustomers, mockOrders } from './mockData';
import type { Customer } from '../types';

// React Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const API_BASE_URL = import.meta.env.VITE_API_URL || 'mock';

export const api = axios.create({
  baseURL: API_BASE_URL === 'mock' ? '' : API_BASE_URL,
});

// A helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Custom Axios Adapter for Client-Side Mocking
api.defaults.adapter = async function (config: AxiosRequestConfig): Promise<any> {
  // If a real API URL is specified, use the default adapter
  if (API_BASE_URL !== 'mock') {
    // Restore default adapter
    const httpAdapter = (axios.defaults as any).adapter;
    if (httpAdapter && httpAdapter !== api.defaults.adapter) {
      return httpAdapter(config);
    }
  }

  // Retrieve current config from Redux parameters or headers to check for API error simulation
  const simulateError = config.headers ? config.headers['x-simulate-error'] === 'true' : false;
  const apiDelay = config.headers && config.headers['x-api-delay'] ? parseInt(config.headers['x-api-delay'] as string, 10) : 800;

  await delay(apiDelay);

  if (simulateError) {
    throw {
      message: 'Simulated API Error: Failed to fetch dashboard data.',
      response: {
        status: 500,
        statusText: 'Internal Server Error',
        data: { message: 'Database connection failed' }
      },
      config
    };
  }

  const url = config.url || '';
  const params = config.params || {};

  // Log requests in dev console to show mock activity
  console.log(`[Mock API] ${config.method?.toUpperCase()} ${url}`, params);

  // 1. GET /api/kpis
  if (url.endsWith('/api/kpis')) {
    // Calculate dynamic KPIs based on filters
    const region = params.region || 'All';
    const status = params.status || 'All';
    const minRev = Number(params.minRevenue) || 0;
    const maxRev = Number(params.maxRevenue) || 9999999;

    let filtered = [...mockCustomers];
    if (region !== 'All') filtered = filtered.filter(c => c.region === region);
    if (status !== 'All') filtered = filtered.filter(c => c.status === status);
    filtered = filtered.filter(c => c.revenue >= minRev && c.revenue <= maxRev);

    // Compute metrics
    const totalRev = filtered.reduce((sum, c) => sum + c.revenue, 0);
    const totalOrd = filtered.reduce((sum, c) => sum + c.orders, 0);

    // Baseline fallback scaling to keep visuals aligned with dashboard size
    const scaleFactor = region === 'All' ? 1 : (filtered.length / mockCustomers.length || 0.1);

    const kpis = [
      {
        id: 'revenue',
        titleKey: 'kpis.revenue',
        value: region === 'All' && status === 'All' && minRev === 0 ? 1248500 : totalRev,
        format: 'currency' as const,
        change: +(12.4 * (0.8 + scaleFactor * 0.2)).toFixed(1),
        trend: scaleFactor >= 0.5 ? 'up' as const : 'down' as const
      },
      {
        id: 'customers',
        titleKey: 'kpis.customers',
        value: region === 'All' && status === 'All' && minRev === 0 ? 14820 : Math.round(14820 * scaleFactor),
        format: 'number' as const,
        change: +(8.2 * (0.9 + scaleFactor * 0.1)).toFixed(1),
        trend: scaleFactor >= 0.4 ? 'up' as const : 'down' as const
      },
      {
        id: 'orders',
        titleKey: 'kpis.orders',
        value: region === 'All' && status === 'All' && minRev === 0 ? 45120 : totalOrd,
        format: 'number' as const,
        change: +(18.5 * (0.7 + scaleFactor * 0.3)).toFixed(1),
        trend: scaleFactor >= 0.5 ? 'up' as const : 'down' as const
      },
      {
        id: 'conversion',
        titleKey: 'kpis.conversion',
        value: region === 'All' ? 3.24 : +(3.24 * (0.9 + Math.random() * 0.2)).toFixed(2),
        format: 'percentage' as const,
        change: +(0.4 * (scaleFactor > 0.5 ? 1 : -1)).toFixed(1),
        trend: scaleFactor > 0.5 ? 'up' as const : 'down' as const
      },
      {
        id: 'growth',
        titleKey: 'kpis.growth',
        value: region === 'All' ? 24.3 : +(24.3 * scaleFactor).toFixed(1),
        format: 'percentage' as const,
        change: -1.2,
        trend: 'down' as const
      }
    ];

    return responseJson(kpis, config);
  }

  // 2. GET /api/charts
  if (url.endsWith('/api/charts')) {
    const region = params.region || 'All';
    const scaleFactor = region === 'All' ? 1 : (mockSalesByRegion.find(r => r.region === region)?.revenue || 100000) / 1248500;

    // Scale chart data based on selected region
    const monthlyRevenue = mockMonthlyRevenue.map(m => ({
      ...m,
      actual: Math.round(m.actual * scaleFactor),
      target: Math.round(m.target * scaleFactor),
      orders: Math.round(m.orders * scaleFactor)
    }));

    const customerGrowth = mockCustomerGrowth.map(c => ({
      ...c,
      newCustomers: Math.round(c.newCustomers * scaleFactor),
      totalCustomers: Math.round(c.totalCustomers * scaleFactor)
    }));

    const salesByRegion = mockSalesByRegion;
    const salesByProduct = mockSalesByProduct.map(p => ({
      ...p,
      sales: Math.round(p.sales * scaleFactor),
      revenue: Math.round(p.revenue * scaleFactor)
    }));

    const categoryDistribution = mockCategoryDistribution;

    return responseJson({
      monthlyRevenue,
      customerGrowth,
      salesByRegion,
      salesByProduct,
      categoryDistribution,
      recentOrders: mockOrders
    }, config);
  }

  // 3. GET /api/customers
  if (url.endsWith('/api/customers')) {
    let filtered = [...mockCustomers];

    // Filter by Region
    if (params.region && params.region !== 'All') {
      filtered = filtered.filter(c => c.region === params.region);
    }

    // Filter by Status
    if (params.status && params.status !== 'All') {
      filtered = filtered.filter(c => c.status === params.status);
    }

    // Filter by Custom Revenue range
    if (params.minRevenue !== undefined) {
      filtered = filtered.filter(c => c.revenue >= Number(params.minRevenue));
    }
    if (params.maxRevenue !== undefined) {
      filtered = filtered.filter(c => c.revenue <= Number(params.maxRevenue));
    }

    // Filter by Search Query
    if (params.q) {
      const q = params.q.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
      );
    }

    // Sorting
    const sortField = (params._sort || 'name') as keyof Customer;
    const sortOrder = params._order === 'desc' ? -1 : 1;

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * sortOrder;
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * sortOrder;
      }
      return 0;
    });

    const totalCount = filtered.length;

    // Pagination
    const page = Number(params._page) || 1;
    const limit = Number(params._limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginated = filtered.slice(startIndex, endIndex);

    // Standard JSON-Server style response with X-Total-Count header
    return {
      data: paginated,
      status: 200,
      statusText: 'OK',
      headers: {
        'x-total-count': String(totalCount)
      },
      config
    };
  }

  // Fallback 404
  throw {
    message: `Mock Endpoint not found: ${url}`,
    response: {
      status: 404,
      statusText: 'Not Found',
      data: { message: 'Not found' }
    },
    config
  };
};

function responseJson(data: any, config: AxiosRequestConfig) {
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: { 'content-type': 'application/json' },
    config: config as any
  };
}
