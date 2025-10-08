'use client'

import { useState } from 'react'
import { 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp,
  Calendar,
  Filter,
  Printer,
  Mail
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const reportTypes = [
  {
    id: 'inventory',
    name: 'Inventory Report',
    description: 'Current stock levels and inventory valuation',
    icon: BarChart3,
    color: 'blue'
  },
  {
    id: 'sales',
    name: 'Sales Report',
    description: 'Sales performance and revenue analysis',
    icon: TrendingUp,
    color: 'green'
  },
  {
    id: 'purchases',
    name: 'Purchase Report',
    description: 'Purchase history and supplier analysis',
    icon: FileText,
    color: 'purple'
  },
  {
    id: 'low-stock',
    name: 'Low Stock Alert',
    description: 'Products with low inventory levels',
    icon: BarChart3,
    color: 'red'
  }
]

const sampleData = {
  inventory: [
    { product: 'iPhone 15 Pro', sku: 'IPH15P-256', stock: 25, value: 29975 },
    { product: 'MacBook Air M2', sku: 'MBA-M2-512', stock: 15, value: 19485 },
    { product: 'Samsung Galaxy S24', sku: 'SGS24-256', stock: 5, value: 4995 },
  ],
  sales: [
    { date: '2024-01-20', revenue: 6697, orders: 3 },
    { date: '2024-01-19', revenue: 4296, orders: 2 },
    { date: '2024-01-18', revenue: 2398, orders: 1 },
  ],
  purchases: [
    { supplier: 'Apple Inc.', amount: 49950, items: 50 },
    { supplier: 'Samsung Electronics', amount: 23970, items: 30 },
    { supplier: 'Dell Technologies', amount: 24000, items: 20 },
  ],
  lowStock: [
    { product: 'Samsung Galaxy S24', current: 5, minimum: 10, status: 'Low' },
    { product: 'Dell XPS 13', current: 0, minimum: 5, status: 'Out of Stock' },
  ]
}

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const handleGenerateReport = (reportType: string) => {
    setSelectedReport(reportType)
    setShowPreview(true)
  }

  const handleExportReport = (format: 'pdf' | 'csv' | 'excel') => {
    // In a real application, this would trigger the actual export
    console.log(`Exporting ${selectedReport} as ${format}`)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Generate and export detailed reports for your business insights</p>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reportTypes.map((report) => (
          <div key={report.id} className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className={`h-12 w-12 bg-${report.color}-100 rounded-lg flex items-center justify-center`}>
                <report.icon className={`h-6 w-6 text-${report.color}-600`} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-500">{report.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleGenerateReport(report.id)}
              className="w-full btn btn-primary"
            >
              Generate Report
            </button>
          </div>
        ))}
      </div>

      {/* Report Filters */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input"
            >
              <option value="">Select date range</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select className="input">
              <option value="">All Locations</option>
              <option value="main">Main Store</option>
              <option value="warehouse">Warehouse</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select className="input">
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {reportTypes.find(r => r.id === selectedReport)?.name} Preview
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleExportReport('pdf')}
                  className="btn btn-outline flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  PDF
                </button>
                <button
                  onClick={() => handleExportReport('csv')}
                  className="btn btn-outline flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  CSV
                </button>
                <button
                  onClick={() => handleExportReport('excel')}
                  className="btn btn-outline flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Excel
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="btn btn-outline"
                >
                  Close
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {selectedReport === 'inventory' && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Inventory Report</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sampleData.inventory.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.product}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.sku}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.stock}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(item.value)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selectedReport === 'sales' && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Sales Report</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sampleData.sales.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(item.revenue)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.orders}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selectedReport === 'purchases' && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Purchase Report</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sampleData.purchases.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.supplier}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(item.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.items}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selectedReport === 'low-stock' && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alert</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Minimum</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sampleData.lowStock.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.product}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.current}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.minimum}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                item.status === 'Out of Stock' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
