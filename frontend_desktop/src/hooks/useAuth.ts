// Authentication Hook
import { useState, useEffect, createContext, useContext } from 'react'
import { User } from '../types/api'
import { apiService } from '../services/api'
import { mockUser } from '../services/mockData'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('auth_token')
    if (token) {
      // For now, use mock user data
      // Replace this with actual API call when backend is ready
      setUser(mockUser)
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      // For development, simulate login with mock data
      // Replace with actual API call: const response = await apiService.login(email, password)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      const mockToken = 'mock-jwt-token-' + Date.now()
      apiService.setToken(mockToken)
      setUser(mockUser)
      
      console.log('Login successful (mock)')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      
      // For development, simulate logout
      // Replace with actual API call: await apiService.logout()
      
      apiService.clearToken()
      setUser(null)
      
      console.log('Logout successful (mock)')
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true)
      
      // For development, simulate profile update
      // Replace with actual API call: const response = await apiService.updateProfile(data)
      
      if (user) {
        const updatedUser = { ...user, ...data }
        setUser(updatedUser)
      }
      
      console.log('Profile updated (mock):', data)
    } catch (error) {
      console.error('Profile update failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    login,
    logout,
    updateProfile
  }
}