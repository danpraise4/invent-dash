'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  FileText, 
  Bell, 
  Settings,
  Warehouse
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AuthService } from '@/lib/auth'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, permission: 'dashboard:read' },
  { name: 'Products', href: '/products', icon: Package, permission: 'products:read' },
  { name: 'Inventory', href: '/inventory', icon: Warehouse, permission: 'inventory:read' },
  { name: 'Suppliers', href: '/suppliers', icon: Users, permission: 'suppliers:read' },
  { name: 'Sales', href: '/sales', icon: ShoppingCart, permission: 'sales:read' },
  { name: 'Purchases', href: '/purchases', icon: TrendingUp, permission: 'purchases:read' },
  { name: 'Reports', href: '/reports', icon: FileText, permission: 'reports:read' },
  { name: 'Notifications', href: '/notifications', icon: Bell, permission: 'notifications:read' },
  { name: 'Settings', href: '/settings', icon: Settings, permission: 'settings:read' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
  }, [])

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">IMS</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const hasPermission = isClient ? AuthService.canAccess(item.permission) : true
          
          if (!hasPermission) return null
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
