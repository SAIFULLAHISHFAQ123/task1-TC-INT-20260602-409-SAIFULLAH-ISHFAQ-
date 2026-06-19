import type { Customer } from '../types';

export const exportToCsv = (data: Customer[], filename: string) => {
  const headers = [
    'Customer ID',
    'Customer Name',
    'Email Address',
    'Revenue (USD)',
    'Total Orders',
    'Status',
    'Region',
    'Joined Date'
  ];

  const rows = data.map(c => [
    `USR-${c.id.padStart(5, '0')}`,
    c.name,
    c.email,
    c.revenue,
    c.orders,
    c.status,
    c.region,
    c.joinedDate
  ]);

  // Create standard CSV string escaping inner double quotes
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')
    )
  ].join('\n');

  // Prefix UTF-8 BOM to let Excel automatically recognize UTF-8 characters
  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], {
    type: 'text/csv;charset=utf-8;'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
