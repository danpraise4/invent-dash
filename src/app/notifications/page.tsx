import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import Notifications from '@/components/notifications'

export default function NotificationsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Notifications />
        </main>
      </div>
    </div>
  )
}
