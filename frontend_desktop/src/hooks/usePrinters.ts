// Printers Management Hook
import { useState, useEffect } from 'react'
import { Printer } from '../types/api'
import { apiService } from '../services/api'
import { mockPrinters } from '../services/mockData'

export const usePrinters = () => {
  const [printers, setPrinters] = useState<Printer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrinters = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // For development, use mock data
      // Replace with actual API call: const response = await apiService.getPrinters()
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setPrinters(mockPrinters)
      console.log('Printers fetched (mock):', mockPrinters.length)
    } catch (err) {
      setError('Failed to fetch printers')
      console.error('Error fetching printers:', err)
    } finally {
      setLoading(false)
    }
  }

  const addPrinter = async (printerData: Omit<Printer, 'id'>) => {
    try {
      // For development, simulate adding printer
      // Replace with actual API call: await apiService.addPrinter(printerData)
      
      const newPrinter: Printer = {
        ...printerData,
        id: Date.now().toString()
      }
      
      setPrinters(prev => [...prev, newPrinter])
      console.log('Printer added (mock):', newPrinter)
    } catch (err) {
      setError('Failed to add printer')
      console.error('Error adding printer:', err)
    }
  }

  const updatePrinter = async (printerId: string, data: Partial<Printer>) => {
    try {
      // For development, simulate updating printer
      // Replace with actual API call: await apiService.updatePrinter(printerId, data)
      
      setPrinters(prev => prev.map(printer => 
        printer.id === printerId 
          ? { ...printer, ...data }
          : printer
      ))
      
      console.log('Printer updated (mock):', printerId, data)
    } catch (err) {
      setError('Failed to update printer')
      console.error('Error updating printer:', err)
    }
  }

  const deletePrinter = async (printerId: string) => {
    try {
      // For development, simulate deleting printer
      // Replace with actual API call: await apiService.deletePrinter(printerId)
      
      setPrinters(prev => prev.filter(printer => printer.id !== printerId))
      console.log('Printer deleted (mock):', printerId)
    } catch (err) {
      setError('Failed to delete printer')
      console.error('Error deleting printer:', err)
    }
  }

  useEffect(() => {
    fetchPrinters()
  }, [])

  return {
    printers,
    loading,
    error,
    addPrinter,
    updatePrinter,
    deletePrinter,
    refetch: fetchPrinters
  }
}