import { User } from '@/types'

// Mock authentication service
// In a real app, this would connect to your backend API
export class AuthService {
  private static currentUser: User | null = null
  private static isAuthenticated = false

  static async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Mock authentication - in real app, this would validate against your backend
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'admin@inventory.com',
        name: 'Admin User',
        role: 'admin',
        location: 'Main Store',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        email: 'manager@inventory.com',
        name: 'Store Manager',
        role: 'manager',
        location: 'Main Store',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        email: 'viewer@inventory.com',
        name: 'Accountant',
        role: 'viewer',
        location: 'Main Store',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    // Simple mock validation
    const user = mockUsers.find(u => u.email === email)
    if (user && password === 'password123') {
      this.currentUser = user
      this.isAuthenticated = true
      
      // Store in both localStorage and cookies for compatibility
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(user))
        localStorage.setItem('auth_token', 'mock_jwt_token')
        document.cookie = 'auth_token=mock_jwt_token; path=/; max-age=86400'
      }
      
      return { success: true, user }
    }

    return { success: false, error: 'Invalid email or password' }
  }

  static async logout(): Promise<void> {
    this.currentUser = null
    this.isAuthenticated = false
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_token')
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser
    
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('auth_user')
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser)
        this.isAuthenticated = true
        return this.currentUser
      }
    }
    
    return null
  }

  static isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return this.isAuthenticated || !!localStorage.getItem('auth_token')
    }
    return this.isAuthenticated
  }

  static hasRole(requiredRole: string): boolean {
    const user = this.getCurrentUser()
    if (!user) return false
    
    const roleHierarchy = { admin: 3, manager: 2, viewer: 1 }
    const userLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] || 0
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0
    
    return userLevel >= requiredLevel
  }

  static canAccess(permission: string): boolean {
    const user = this.getCurrentUser()
    if (!user) return false

    const permissions = {
      admin: ['*'], // Admin can do everything
      manager: ['products:read', 'products:write', 'inventory:read', 'inventory:write', 'sales:read', 'sales:write', 'purchases:read', 'purchases:write', 'suppliers:read', 'suppliers:write'],
      viewer: ['products:read', 'inventory:read', 'sales:read', 'purchases:read', 'suppliers:read', 'reports:read']
    }

    const userPermissions = permissions[user.role as keyof typeof permissions] || []
    return userPermissions.includes('*') || userPermissions.includes(permission)
  }
}
