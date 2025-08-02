// Jobs Management Hook
import { useState, useEffect } from 'react'
import { Job } from '../types/api'
import { apiService } from '../services/api'
import { mockJobs } from '../services/mockData'

export const useJobs = (status?: string) => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // For development, use mock data
      // Replace with actual API call: const response = await apiService.getJobs(status)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let filteredJobs = mockJobs
      if (status) {
        filteredJobs = mockJobs.filter(job => job.status === status)
      }
      
      setJobs(filteredJobs)
      console.log('Jobs fetched (mock):', filteredJobs.length)
    } catch (err) {
      setError('Failed to fetch jobs')
      console.error('Error fetching jobs:', err)
    } finally {
      setLoading(false)
    }
  }

  const acceptJob = async (jobId: string) => {
    try {
      // For development, simulate job acceptance
      // Replace with actual API call: await apiService.acceptJob(jobId)
      
      setJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status: 'in-progress' as const }
          : job
      ))
      
      console.log('Job accepted (mock):', jobId)
    } catch (err) {
      setError('Failed to accept job')
      console.error('Error accepting job:', err)
    }
  }

  const rejectJob = async (jobId: string, reason?: string) => {
    try {
      // For development, simulate job rejection
      // Replace with actual API call: await apiService.rejectJob(jobId, reason)
      
      setJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status: 'cancelled' as const }
          : job
      ))
      
      console.log('Job rejected (mock):', jobId, reason)
    } catch (err) {
      setError('Failed to reject job')
      console.error('Error rejecting job:', err)
    }
  }

  const updateJobStatus = async (jobId: string, status: Job['status']) => {
    try {
      // For development, simulate status update
      // Replace with actual API call: await apiService.updateJobStatus(jobId, status)
      
      setJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status }
          : job
      ))
      
      console.log('Job status updated (mock):', jobId, status)
    } catch (err) {
      setError('Failed to update job status')
      console.error('Error updating job status:', err)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [status])

  return {
    jobs,
    loading,
    error,
    acceptJob,
    rejectJob,
    updateJobStatus,
    refetch: fetchJobs
  }
}

export const useJob = (jobId: string) => {
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // For development, use mock data
        // Replace with actual API call: const response = await apiService.getJob(jobId)
        
        const foundJob = mockJobs.find(j => j.id === jobId)
        setJob(foundJob || null)
        
        console.log('Job fetched (mock):', foundJob)
      } catch (err) {
        setError('Failed to fetch job')
        console.error('Error fetching job:', err)
      } finally {
        setLoading(false)
      }
    }

    if (jobId) {
      fetchJob()
    }
  }, [jobId])

  return { job, loading, error }
}