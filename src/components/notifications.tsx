'use client'

import { useState } from 'react'
import { 
  Bell, 
  AlertTriangle, 
  Package, 
  ShoppingCart,
  TrendingUp,
  Check,
  X,
  Settings,
  Mail
} from 'lucide-react'
import { Notification } from '@/types'
import { formatDateTime } from '@/lib/utils'

// Mock data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'low_stock',
    title: 'Low Stock Alert',
    message: 'Samsung Galaxy S24 is running low (5 units remaining)',
    isRead: false,
    createdAt: new Date('2024-01-20T10:30:00'),
  },
  {
    id: '2',
    type: 'out_of_stock',
    title: 'Out of Stock',
    message: 'Dell XPS 13 is completely out of stock',
    isRead: false,
    createdAt: new Date('2024-01-20T09:15:00'),
  },
  {
    id: '3',
    type: 'purchase_order',
    title: 'Purchase Order Received',
    message: 'New purchase order from Apple Inc. for iPhone 15 Pro',
    isRead: true,
    createdAt: new Date('2024-01-19T16:45:00'),
  },
  {
    id: '4',
    type: 'low_stock',
    title: 'Low Stock Alert',
    message: 'MacBook Air M2 is running low (15 units remaining)',
    isRead: true,
    createdAt: new Date('2024-01-19T14:20:00'),
  },
  {
    id: '5',
    type: 'expiring_item',
    title: 'Expiring Item',
    message: 'Some products are approaching their expiration date',
    isRead: true,
    createdAt: new Date('2024-01-18T11:30:00'),
  },
]

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [selectedType, setSelectedType] = useState('')

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.isRead) ||
                         (filter === 'read' && notification.isRead)
    const matchesType = selectedType === '' || notification.type === selectedType
    return matchesFilter && matchesType
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'low_stock':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'out_of_stock':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'purchase_order':
        return <ShoppingCart className="h-5 w-5 text-blue-500" />
      case 'expiring_item':
        return <Package className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'low_stock':
        return 'bg-yellow-50 border-yellow-200'
      case 'out_of_stock':
        return 'bg-red-50 border-red-200'
      case 'purchase_order':
        return 'bg-blue-50 border-blue-200'
      case 'expiring_item':
        return 'bg-orange-50 border-orange-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Stay updated with your inventory alerts and system notifications</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn btn-outline flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </button>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="btn btn-primary"
              >
                Mark All as Read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Notifications</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.type === 'low_stock' && !n.isRead).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.type === 'purchase_order' && !n.isRead).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="purchase_order">Purchase Orders</option>
            <option value="expiring_item">Expiring Items</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="card p-12 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! No new notifications at the moment.</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`card p-6 border-l-4 ${getNotificationColor(notification.type)} ${
                !notification.isRead ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="h-2 w-2 bg-primary-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {notification.message}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {formatDateTime(notification.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 text-gray-400 hover:text-green-600"
                      title="Mark as read"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                    title="Delete notification"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
