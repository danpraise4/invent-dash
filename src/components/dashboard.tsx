'use client'

import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  ShoppingCart,
  Users,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const stats = [
  {
    name: 'Total Products',
    value: '1,234',
    change: '+12%',
    changeType: 'positive',
    icon: Package,
  },
  {
    name: 'Total Stock Value',
    value: '$45,678',
    change: '+8%',
    changeType: 'positive',
    icon: DollarSign,
  },
  {
    name: 'Low Stock Items',
    value: '23',
    change: '-3',
    changeType: 'negative',
    icon: AlertTriangle,
  },
  {
    name: 'Monthly Sales',
    value: '$12,345',
    change: '+15%',
    changeType: 'positive',
    icon: TrendingUp,
  },
]

const recentActivities = [
  { id: 1, action: 'Product added', item: 'iPhone 15 Pro', time: '2 minutes ago', type: 'product' },
  { id: 2, action: 'Sale recorded', item: 'MacBook Air M2', time: '15 minutes ago', type: 'sale' },
  { id: 3, action: 'Stock adjusted', item: 'Samsung Galaxy S24', time: '1 hour ago', type: 'adjustment' },
  { id: 4, action: 'Purchase order', item: 'Dell XPS 13', time: '2 hours ago', type: 'purchase' },
]

const topProducts = [
  { name: 'iPhone 15 Pro', sales: 45, revenue: '$22,500' },
  { name: 'MacBook Air M2', sales: 32, revenue: '$25,600' },
  { name: 'Samsung Galaxy S24', sales: 28, revenue: '$19,600' },
  { name: 'Dell XPS 13', sales: 25, revenue: '$18,750' },
]

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your inventory.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-1">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <button className="btn btn-ghost btn-sm">View all</button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}</span> - {activity.item}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            <button className="btn btn-ghost btn-sm">View all</button>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
