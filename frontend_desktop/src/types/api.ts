// API Types and Interfaces

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  location?: string
  joinDate: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface Job {
  id: string
  customerName: string
  fileName: string
  fileType: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  printType: string
  quantity: number
  material: string
  color: string
  estimatedTime: string
  price: number
  submittedAt: string
  completedAt?: string
  notes?: string
}

export interface Printer {
  id: string
  name: string
  model: string
  status: 'online' | 'offline' | 'busy' | 'error'
  ipAddress: string
  location: string
  materials: string[]
  currentJob?: string
}

export interface EarningsData {
  totalRevenue: number
  monthlyRevenue: number
  completedJobs: number
  avgJobValue: number
  revenueByMonth: Array<{
    month: string
    revenue: number
    jobs: number
  }>
}

export interface AppSettings {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  autoAcceptJobs: boolean
  maxConcurrentJobs: number
  defaultPriority: string
  businessHours: {
    start: string
    end: string
    workDays: string[]
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}