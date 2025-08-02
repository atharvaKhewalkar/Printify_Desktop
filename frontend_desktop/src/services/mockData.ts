// Mock Data for Development - Replace with actual API calls
import { Job, Printer, EarningsData, User, AppSettings } from '../types/api'

// Mock user data
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/placeholder.svg',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  joinDate: '2023-01-15'
}

// Mock jobs data
export const mockJobs: Job[] = [
  {
    id: '1',
    customerName: 'Alice Smith',
    fileName: 'prototype_v2.stl',
    fileType: 'STL',
    priority: 'high',
    status: 'pending',
    printType: '3D Print',
    quantity: 2,
    material: 'PLA',
    color: 'Red',
    estimatedTime: '4h 30m',
    price: 45.00,
    submittedAt: '2024-01-20T10:30:00Z',
    notes: 'High precision required'
  },
  {
    id: '2',
    customerName: 'Bob Johnson',
    fileName: 'business_cards.pdf',
    fileType: 'PDF',
    priority: 'medium',
    status: 'in-progress',
    printType: 'Document',
    quantity: 500,
    material: 'Paper',
    color: 'Black/White',
    estimatedTime: '1h 15m',
    price: 25.00,
    submittedAt: '2024-01-20T09:15:00Z'
  },
  {
    id: '3',
    customerName: 'Carol Wilson',
    fileName: 'custom_part.obj',
    fileType: 'OBJ',
    priority: 'urgent',
    status: 'pending',
    printType: '3D Print',
    quantity: 1,
    material: 'ABS',
    color: 'Blue',
    estimatedTime: '6h 45m',
    price: 75.00,
    submittedAt: '2024-01-20T08:00:00Z',
    notes: 'Rush order - needed by tomorrow'
  }
]

// Mock printers data
export const mockPrinters: Printer[] = [
  {
    id: '1',
    name: 'Ultimaker S3',
    model: 'S3',
    status: 'online',
    ipAddress: '192.168.1.100',
    location: 'Workshop A',
    materials: ['PLA', 'ABS', 'PETG'],
    currentJob: '2'
  },
  {
    id: '2',
    name: 'Prusa i3 MK3S+',
    model: 'i3 MK3S+',
    status: 'busy',
    ipAddress: '192.168.1.101',
    location: 'Workshop B',
    materials: ['PLA', 'ABS', 'ASA'],
    currentJob: '1'
  },
  {
    id: '3',
    name: 'Ender 3 V2',
    model: 'Ender 3 V2',
    status: 'offline',
    ipAddress: '192.168.1.102',
    location: 'Workshop C',
    materials: ['PLA', 'PETG']
  }
]

// Mock earnings data
export const mockEarnings: EarningsData = {
  totalRevenue: 12450.00,
  monthlyRevenue: 2890.00,
  completedJobs: 156,
  avgJobValue: 35.75,
  revenueByMonth: [
    { month: 'Jan', revenue: 2450, jobs: 28 },
    { month: 'Feb', revenue: 2890, jobs: 34 },
    { month: 'Mar', revenue: 3200, jobs: 41 },
    { month: 'Apr', revenue: 2850, jobs: 32 },
    { month: 'May', revenue: 3100, jobs: 38 },
    { month: 'Jun', revenue: 2950, jobs: 35 }
  ]
}

// Mock app settings
export const mockSettings: AppSettings = {
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  autoAcceptJobs: false,
  maxConcurrentJobs: 5,
  defaultPriority: 'medium',
  businessHours: {
    start: '09:00',
    end: '17:00',
    workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  }
}