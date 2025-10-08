'use client'

import { useState } from 'react'
import { 
  AlertTriangle, 
  Package, 
  TrendingDown, 
  TrendingUp,
  Search,
  Filter,
  Download,
  Plus,
  Minus,
  RotateCcw
} from 'lucide-react'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'

// Mock data with inventory details
const mockInventory = [
  {
    id: '1',
    product: {
      id: '1',
      name: 'iPhone 15 Pro',
      sku: 'IPH15P-256',
      category: 'Electronics',
      brand: 'Apple',
    },
    totalStock: 25,
    availableStock: 20,
    reservedStock: 5,
    location: 'Main Store',
    lastUpdated: new Date('2024-01-15'),
    status: 'normal' as 'low' | 'out' | 'normal',
  },
  {
    id: '2',
    product: {
      id: '2',
      name: 'MacBook Air M2',
      sku: 'MBA-M2-512',
      category: 'Electronics',
      brand: 'Apple',
    },
    totalStock: 15,
    availableStock: 15,
    reservedStock: 0,
    location: 'Main Store',
    lastUpdated: new Date('2024-01-10'),
    status: 'normal' as 'low' | 'out' | 'normal',
  },
  {
    id: '3',
    product: {
      id: '3',
      name: 'Samsung Galaxy S24',
      sku: 'SGS24-256',
      category: 'Electronics',
      brand: 'Samsung',
    },
    totalStock: 5,
    availableStock: 2,
    reservedStock: 3,
    location: 'Main Store',
    lastUpdated: new Date('2024-01-20'),
    status: 'low' as 'low' | 'out' | 'normal',
  },
  {
    id: '4',
    product: {
      id: '4',
      name: 'Dell XPS 13',
      sku: 'DXP13-512',
      category: 'Electronics',
      brand: 'Dell',
    },
    totalStock: 0,
    availableStock: 0,
    reservedStock: 0,
    location: 'Main Store',
    lastUpdated: new Date('2024-01-18'),
    status: 'out' as 'low' | 'out' | 'normal',
  },
]

export default function InventoryTracking() {
  const [inventory, setInventory] = useState(mockInventory)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showAdjustModal, setShowAdjustModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = selectedLocation === '' || item.location === selectedLocation
    const matchesStatus = selectedStatus === '' || item.status === selectedStatus
    return matchesSearch && matchesLocation && matchesStatus
  })

  const locations = Array.from(new Set(inventory.map(item => item.location)))
  const lowStockItems = inventory.filter(item => item.status === 'low' || item.status === 'out')
  const totalValue = inventory.reduce((sum, item) => sum + (item.totalStock * 1000), 0) // Mock calculation

  const handleStockAdjustment = (productId: string, adjustment: number, reason: string) => {
    setInventory(prev => prev.map(item => 
      item.product.id === productId 
        ? { 
            ...item, 
            totalStock: Math.max(0, item.totalStock + adjustment),
            availableStock: Math.max(0, item.availableStock + adjustment),
            lastUpdated: new Date()
          }
        : item
    ))
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Tracking</h1>
        <p className="text-gray-600">Monitor stock levels and manage inventory across locations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Stock Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockItems.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {inventory.filter(item => item.status === 'out').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="normal">Normal</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <button className="btn btn-outline flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button 
            onClick={() => setShowAdjustModal(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Stock Adjustment
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reserved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                        <div className="text-sm text-gray-500">{item.product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.totalStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.availableStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.reservedStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'out' 
                        ? 'bg-red-100 text-red-800' 
                        : item.status === 'low'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.status === 'out' ? 'Out of Stock' : 
                       item.status === 'low' ? 'Low Stock' : 'Normal'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastUpdated.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedProduct(item)
                          setShowAdjustModal(true)
                        }}
                        className="text-gray-400 hover:text-gray-600"
                        title="Adjust Stock"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Stock Adjustment</h3>
              <button 
                onClick={() => setShowAdjustModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              {selectedProduct && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product
                  </label>
                  <p className="text-sm text-gray-900">{selectedProduct.product.name}</p>
                  <p className="text-xs text-gray-500">Current Stock: {selectedProduct.totalStock}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adjustment Type
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="flex-1 btn btn-outline flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Stock
                  </button>
                  <button
                    type="button"
                    className="flex-1 btn btn-outline flex items-center justify-center gap-2"
                  >
                    <Minus className="h-4 w-4" />
                    Remove Stock
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter quantity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <select className="input">
                  <option value="">Select reason</option>
                  <option value="damaged">Damaged Goods</option>
                  <option value="return">Customer Return</option>
                  <option value="theft">Theft/Loss</option>
                  <option value="found">Found Stock</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="input"
                  rows={3}
                  placeholder="Additional notes (optional)"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Adjust Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
