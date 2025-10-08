'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/lib/auth'
import { User } from '@/types'

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: string
  requiredPermission?: string
}

export default function AuthGuard({ 
  children, 
  requiredRole, 
  requiredPermission 
}: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = AuthService.getCurrentUser()
      
      if (!currentUser) {
        router.push('/login')
        return
      }

      // Check role requirement
      if (requiredRole && !AuthService.hasRole(requiredRole)) {
        router.push('/unauthorized')
        return
      }

      // Check permission requirement
      if (requiredPermission && !AuthService.canAccess(requiredPermission)) {
        router.push('/unauthorized')
        return
      }

      setUser(currentUser)
      setIsLoading(false)
    }

    checkAuth()
  }, [requiredRole, requiredPermission, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return <>{children}</>
}
