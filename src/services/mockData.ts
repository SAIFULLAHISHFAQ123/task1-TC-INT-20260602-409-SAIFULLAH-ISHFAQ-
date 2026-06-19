import type { Customer, KpiData, MonthlyRevenue, SalesByRegion, SalesByProduct, CustomerGrowth, CategoryDistribution, Order } from '../types';

export const mockKpis: KpiData[] = [
  { id: 'revenue', titleKey: 'kpis.revenue', value: 1248500, format: 'currency', change: 12.4, trend: 'up' },
  { id: 'customers', titleKey: 'kpis.customers', value: 14820, format: 'number', change: 8.2, trend: 'up' },
  { id: 'orders', titleKey: 'kpis.orders', value: 45120, format: 'number', change: 18.5, trend: 'up' },
  { id: 'conversion', titleKey: 'kpis.conversion', value: 3.24, format: 'percentage', change: 0.4, trend: 'up' },
  { id: 'growth', titleKey: 'kpis.growth', value: 24.3, format: 'percentage', change: -1.2, trend: 'down' }
];

export const mockMonthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jan', actual: 85000, target: 80000, orders: 3200 },
  { month: 'Feb', actual: 95000, target: 85000, orders: 3500 },
  { month: 'Mar', actual: 110000, target: 90000, orders: 4100 },
  { month: 'Apr', actual: 105000, target: 95000, orders: 3900 },
  { month: 'May', actual: 120000, target: 100000, orders: 4500 },
  { month: 'Jun', actual: 135000, target: 110000, orders: 5100 },
  { month: 'Jul', actual: 140000, target: 115000, orders: 5300 },
  { month: 'Aug', actual: 130000, target: 120000, orders: 4900 },
  { month: 'Sep', actual: 145000, target: 125000, orders: 5500 },
  { month: 'Oct', actual: 160000, target: 130000, orders: 6100 },
  { month: 'Nov', actual: 175000, target: 140000, orders: 6700 },
  { month: 'Dec', actual: 198500, target: 150000, orders: 7420 }
];

export const mockSalesByRegion: SalesByRegion[] = [
  { region: 'North', sales: 1200, revenue: 380000 },
  { region: 'South', sales: 950, revenue: 290000 },
  { region: 'East', sales: 1450, revenue: 450000 },
  { region: 'West', sales: 780, revenue: 128500 }
];

export const mockSalesByProduct: SalesByProduct[] = [
  { product: 'SaaS Suite', sales: 850, revenue: 520000 },
  { product: 'Hardware', sales: 620, revenue: 340000 },
  { product: 'Consulting', sales: 180, revenue: 210000 },
  { product: 'Support Plan', sales: 1240, revenue: 178500 }
];

export const mockCustomerGrowth: CustomerGrowth[] = [
  { month: 'Jan', newCustomers: 320, totalCustomers: 8500 },
  { month: 'Feb', newCustomers: 450, totalCustomers: 8950 },
  { month: 'Mar', newCustomers: 500, totalCustomers: 9450 },
  { month: 'Apr', newCustomers: 420, totalCustomers: 9870 },
  { month: 'May', newCustomers: 580, totalCustomers: 10450 },
  { month: 'Jun', newCustomers: 640, totalCustomers: 11090 },
  { month: 'Jul', newCustomers: 700, totalCustomers: 11790 },
  { month: 'Aug', newCustomers: 610, totalCustomers: 12400 },
  { month: 'Sep', newCustomers: 720, totalCustomers: 13120 },
  { month: 'Oct', newCustomers: 850, totalCustomers: 13970 },
  { month: 'Nov', newCustomers: 900, totalCustomers: 14870 },
  { month: 'Dec', newCustomers: 950, totalCustomers: 15820 }
];

export const mockCategoryDistribution: CategoryDistribution[] = [
  { category: 'Enterprise', value: 45, color: '#6366f1' },
  { category: 'Mid-Market', value: 30, color: '#a855f7' },
  { category: 'SMB', value: 15, color: '#22c55e' },
  { category: 'Individual', value: 10, color: '#f59e0b' }
];

export const mockCustomers: Customer[] = [
  { id: '1', name: 'Acme Corporation', email: 'billing@acme.com', revenue: 125000, orders: 48, status: 'Active', region: 'North', joinedDate: '2025-01-15' },
  { id: '2', name: 'Globex Corporation', email: 'accounts@globex.com', revenue: 98000, orders: 36, status: 'Active', region: 'South', joinedDate: '2025-02-10' },
  { id: '3', name: 'Initech LLC', email: 'payments@initech.com', revenue: 45000, orders: 22, status: 'Active', region: 'East', joinedDate: '2025-03-01' },
  { id: '4', name: 'Umbrella Corp', email: 'finance@umbrella.com', revenue: 15000, orders: 8, status: 'Pending', region: 'West', joinedDate: '2025-04-18' },
  { id: '5', name: 'Hooli Inc', email: 'billing@hooli.xyz', revenue: 210000, orders: 74, status: 'Active', region: 'West', joinedDate: '2025-01-20' },
  { id: '6', name: 'Veer Industries', email: 'info@veer.in', revenue: 78000, orders: 31, status: 'Active', region: 'East', joinedDate: '2025-02-14' },
  { id: '7', name: 'Soylent Green Co', email: 'sales@soylent.com', revenue: 12000, orders: 5, status: 'Inactive', region: 'North', joinedDate: '2025-05-12' },
  { id: '8', name: 'Reynholm Industries', email: 'admin@reynholm.co.uk', revenue: 85000, orders: 29, status: 'Active', region: 'South', joinedDate: '2025-03-24' },
  { id: '9', name: 'Wayne Enterprises', email: 'purchasing@waynecorp.com', revenue: 320000, orders: 112, status: 'Active', region: 'East', joinedDate: '2025-01-05' },
  { id: '10', name: 'Stark Industries', email: 'invoice@stark.com', revenue: 410000, orders: 145, status: 'Active', region: 'North', joinedDate: '2025-01-10' },
  { id: '11', name: 'Cyberdyne Systems', email: 'contact@cyberdyne.jp', revenue: 32000, orders: 14, status: 'Pending', region: 'West', joinedDate: '2025-06-01' },
  { id: '12', name: 'Oscorp Technologies', email: 'billing@oscorp.com', revenue: 67000, orders: 25, status: 'Active', region: 'East', joinedDate: '2025-02-28' },
  { id: '13', name: 'Tyrell Corporation', email: 'nexus@tyrell.io', revenue: 180000, orders: 60, status: 'Active', region: 'West', joinedDate: '2025-01-15' },
  { id: '14', name: 'Dunder Mifflin', email: 'halpert@dundermifflin.com', revenue: 54000, orders: 19, status: 'Active', region: 'East', joinedDate: '2025-03-15' },
  { id: '15', name: 'Aperture Science', email: 'cave@aperture.edu', revenue: 150000, orders: 55, status: 'Inactive', region: 'North', joinedDate: '2025-01-22' },
  { id: '16', name: 'Vandelay Industries', email: 'art@vandelay.com', revenue: 8000, orders: 3, status: 'Inactive', region: 'South', joinedDate: '2025-06-10' },
  { id: '17', name: 'Initrode', email: 'support@initrode.com', revenue: 22000, orders: 9, status: 'Active', region: 'East', joinedDate: '2025-04-05' },
  { id: '18', name: 'Bluth Company', email: 'michael@bluthco.com', revenue: 14000, orders: 6, status: 'Pending', region: 'South', joinedDate: '2025-05-20' },
  { id: '19', name: 'LexCorp', email: 'luthor@lexcorp.com', revenue: 280000, orders: 95, status: 'Active', region: 'North', joinedDate: '2025-01-11' },
  { id: '20', name: 'Prestige Worldwide', email: 'boats@prestige.com', revenue: 5000, orders: 2, status: 'Inactive', region: 'South', joinedDate: '2025-06-15' },
  { id: '21', name: 'Massive Dynamic', email: 'bell@massivedynamic.com', revenue: 230000, orders: 88, status: 'Active', region: 'East', joinedDate: '2025-01-30' },
  { id: '22', name: 'Krieger Kleansers', email: ' Krieger@cleansers.de', revenue: 35000, orders: 15, status: 'Active', region: 'North', joinedDate: '2025-03-12' },
  { id: '23', name: 'Sterling Cooper', email: 'draper@sterlingcooper.com', revenue: 115000, orders: 40, status: 'Active', region: 'South', joinedDate: '2025-02-05' },
  { id: '24', name: 'MomCorp', email: 'mom@momcorp.com', revenue: 390000, orders: 130, status: 'Active', region: 'East', joinedDate: '2025-01-08' },
  { id: '25', name: 'Mugatu Designs', email: 'jacob@mugatu.com', revenue: 72000, orders: 28, status: 'Active', region: 'West', joinedDate: '2025-02-18' },
  { id: '26', name: 'Spatula City', email: 'sy@spatulacity.com', revenue: 16000, orders: 7, status: 'Active', region: 'North', joinedDate: '2025-05-02' },
  { id: '27', name: 'Nakatomi Plaza Corp', email: 'takagi@nakatomi.co.jp', revenue: 140000, orders: 50, status: 'Active', region: 'West', joinedDate: '2025-02-22' },
  { id: '28', name: 'Los Pollos Hermanos', email: 'gus@lph.com', revenue: 95000, orders: 44, status: 'Active', region: 'South', joinedDate: '2025-03-10' },
  { id: '29', name: 'Gekko & Co', email: 'bud@gekkoco.com', revenue: 290000, orders: 102, status: 'Active', region: 'East', joinedDate: '2025-01-14' },
  { id: '30', name: 'Pied Piper', email: 'richard@piedpiper.com', revenue: 48000, orders: 18, status: 'Active', region: 'West', joinedDate: '2025-04-01' },
  { id: '31', name: 'Ravenswood Biotech', email: 'info@ravenswood.com', revenue: 63000, orders: 24, status: 'Active', region: 'North', joinedDate: '2025-03-18' },
  { id: '32', name: 'Wonka Chocolate', email: 'willy@wonka.com', revenue: 135000, orders: 52, status: 'Active', region: 'South', joinedDate: '2025-02-15' },
  { id: '33', name: 'Stagg Enterprises', email: 'simon@stagg.org', revenue: 41000, orders: 16, status: 'Inactive', region: 'East', joinedDate: '2025-04-12' },
  { id: '34', name: 'Airlines International', email: 'contact@airlines.com', revenue: 76000, orders: 28, status: 'Active', region: 'West', joinedDate: '2025-03-05' },
  { id: '35', name: 'Oligarchy Financial', email: 'vip@oligarchy.com', revenue: 310000, orders: 108, status: 'Active', region: 'North', joinedDate: '2025-01-20' },
  { id: '36', name: 'Gringotts Vaults', email: 'griphook@gringotts.com', revenue: 240000, orders: 90, status: 'Active', region: 'East', joinedDate: '2025-02-01' },
  { id: '37', name: 'Strickland Propane', email: 'hank@strickland.com', revenue: 38000, orders: 17, status: 'Active', region: 'South', joinedDate: '2025-04-20' },
  { id: '38', name: 'Praxis Energy', email: 'praxis@praxis.com', revenue: 195000, orders: 65, status: 'Active', region: 'West', joinedDate: '2025-01-25' },
  { id: '39', name: 'Veridian Dynamics', email: 'ted@veridiandynamics.com', revenue: 160000, orders: 58, status: 'Active', region: 'North', joinedDate: '2025-02-09' },
  { id: '40', name: 'Buy More', email: 'chuck@buymore.com', revenue: 27000, orders: 12, status: 'Active', region: 'West', joinedDate: '2025-05-15' },
  { id: '41', name: 'Dharma Initiative', email: 'chang@dharma.org', revenue: 84000, orders: 30, status: 'Inactive', region: 'North', joinedDate: '2025-03-08' },
  { id: '42', name: 'Monarch Sciences', email: 'serizawa@monarch.gov', revenue: 145000, orders: 52, status: 'Active', region: 'East', joinedDate: '2025-02-11' },
  { id: '43', name: 'Omni Consumer Products', email: 'ocp@detroit.gov', revenue: 295000, orders: 105, status: 'Active', region: 'North', joinedDate: '2025-01-09' },
  { id: '44', name: 'Tricell Global', email: 'wesker@tricell.com', revenue: 13000, orders: 4, status: 'Pending', region: 'South', joinedDate: '2025-06-05' },
  { id: '45', name: 'Kessel Mining Corp', email: 'kessel@spice.com', revenue: 82000, orders: 27, status: 'Active', region: 'West', joinedDate: '2025-03-29' },
  { id: '46', name: 'Brawndo Corporation', email: 'mutilator@brawndo.com', revenue: 53000, orders: 20, status: 'Active', region: 'South', joinedDate: '2025-04-10' },
  { id: '47', name: 'Chiron Beta Prime', email: 'robot@chiron.com', revenue: 17000, orders: 7, status: 'Inactive', region: 'East', joinedDate: '2025-05-25' },
  { id: '48', name: 'Virtucon Industries', email: 'evil@virtucon.com', revenue: 225000, orders: 82, status: 'Active', region: 'West', joinedDate: '2025-01-19' },
  { id: '49', name: 'Zorg Industries', email: 'jean-baptiste@zorg.com', revenue: 175000, orders: 62, status: 'Active', region: 'East', joinedDate: '2025-02-04' },
  { id: '50', name: 'Sateen Garments', email: 'sateen@sateengarments.ur', revenue: 49000, orders: 23, status: 'Active', region: 'South', joinedDate: '2025-03-19' }
];

export const mockOrders: Order[] = [
  { id: 'ORD-1001', customerName: 'Wayne Enterprises', product: 'SaaS Suite', amount: 4500, status: 'Completed', date: '2026-06-18' },
  { id: 'ORD-1002', customerName: 'Hooli Inc', product: 'Hardware', amount: 12500, status: 'Completed', date: '2026-06-18' },
  { id: 'ORD-1003', customerName: 'Umbrella Corp', product: 'Support Plan', amount: 1500, status: 'Processing', date: '2026-06-17' },
  { id: 'ORD-1004', customerName: 'Stark Industries', product: 'Consulting', amount: 25000, status: 'Completed', date: '2026-06-17' },
  { id: 'ORD-1005', customerName: 'Dunder Mifflin', product: 'SaaS Suite', amount: 800, status: 'Completed', date: '2026-06-16' },
  { id: 'ORD-1006', customerName: 'Cyberdyne Systems', product: 'Hardware', amount: 5600, status: 'Cancelled', date: '2026-06-16' },
  { id: 'ORD-1007', customerName: 'Los Pollos Hermanos', product: 'Support Plan', amount: 2100, status: 'Processing', date: '2026-06-15' },
  { id: 'ORD-1008', customerName: 'Tyrell Corporation', product: 'SaaS Suite', amount: 12000, status: 'Completed', date: '2026-06-15' }
];
