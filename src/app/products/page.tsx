import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import ProductManagement from '@/components/product-management'

export default function ProductsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <ProductManagement />
        </main>
      </div>
    </div>
  )
}
