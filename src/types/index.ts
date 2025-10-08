export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'viewer';
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  brand: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  description?: string;
  location: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customerInfo?: string;
  location: string;
  createdAt: Date;
}

export interface Purchase {
  id: string;
  supplierId: string;
  supplierName: string;
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  location: string;
  createdAt: Date;
}

export interface StockAdjustment {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  reason: string;
  location: string;
  createdAt: Date;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
}

export interface Notification {
  id: string;
  type: 'low_stock' | 'out_of_stock' | 'purchase_order' | 'expiring_item';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
