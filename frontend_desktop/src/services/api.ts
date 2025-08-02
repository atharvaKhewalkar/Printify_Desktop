// API Service - Replace with your actual backend endpoints

const API_BASE_URL = 'http://localhost:3001/api' // Replace with your backend URL

class ApiService {
  private token: string | null = null

  constructor() {
    this.token = localStorage.getItem('auth_token')
  }

  private async request<T>(
    endpoint: string, 
    options: Omit<RequestInit, 'body'> & { body?: any } = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      ...options,
    }

    // Handle body serialization
    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  setToken(token: string) {
    this.token = token
    localStorage.setItem('auth_token', token)
  }

  clearToken() {
    this.token = null
    localStorage.removeItem('auth_token')
  }

  // Authentication endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    })
  }

  async logout() {
    const result = await this.request('/auth/logout', {
      method: 'POST'
    })
    this.clearToken()
    return result
  }

  async getProfile() {
    return this.request('/auth/profile')
  }

  async updateProfile(data: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: data
    })
  }

  // Jobs endpoints
  async getJobs(status?: string) {
    const query = status ? `?status=${status}` : ''
    return this.request(`/jobs${query}`)
  }

  async getJob(id: string) {
    return this.request(`/jobs/${id}`)
  }

  async updateJobStatus(id: string, status: string) {
    return this.request(`/jobs/${id}/status`, {
      method: 'PUT',
      body: { status }
    })
  }

  async acceptJob(id: string) {
    return this.request(`/jobs/${id}/accept`, {
      method: 'POST'
    })
  }

  async rejectJob(id: string, reason?: string) {
    return this.request(`/jobs/${id}/reject`, {
      method: 'POST',
      body: { reason }
    })
  }

  // Print Queue endpoints
  async getQueue() {
    return this.request('/queue')
  }

  async addToQueue(jobId: string, printerId: string) {
    return this.request('/queue', {
      method: 'POST',
      body: { jobId, printerId }
    })
  }

  async removeFromQueue(jobId: string) {
    return this.request(`/queue/${jobId}`, {
      method: 'DELETE'
    })
  }

  // Printers endpoints
  async getPrinters() {
    return this.request('/printers')
  }

  async getPrinter(id: string) {
    return this.request(`/printers/${id}`)
  }

  async updatePrinter(id: string, data: any) {
    return this.request(`/printers/${id}`, {
      method: 'PUT',
      body: data
    })
  }

  async addPrinter(data: any) {
    return this.request('/printers', {
      method: 'POST',
      body: data
    })
  }

  async deletePrinter(id: string) {
    return this.request(`/printers/${id}`, {
      method: 'DELETE'
    })
  }

  // Earnings endpoints
  async getEarnings(startDate?: string, endDate?: string) {
    const params = new URLSearchParams()
    if (startDate) params.append('start', startDate)
    if (endDate) params.append('end', endDate)
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.request(`/earnings${query}`)
  }

  // Settings endpoints
  async getSettings() {
    return this.request('/settings')
  }

  async updateSettings(data: any) {
    return this.request('/settings', {
      method: 'PUT',
      body: data
    })
  }
}

export const apiService = new ApiService()
export default apiService