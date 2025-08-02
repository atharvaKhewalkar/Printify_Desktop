import { useEffect } from 'react'
import { Printer } from 'lucide-react'

interface LoadingScreenProps {
  onLoadingComplete: () => void
  duration?: number
  logoSrc?: string
  companyName?: string
}

export const LoadingScreen = ({ 
  onLoadingComplete, 
  duration = 3000,
  logoSrc,
  companyName = "PrintFlow"
}: LoadingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [onLoadingComplete, duration])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center z-50">
      <div className="text-center space-y-6 animate-fade-in">
        {/* Logo Container */}
        <div className="relative">
          {logoSrc ? (
            <img 
              src={logoSrc} 
              alt={`${companyName} Logo`}
              className="w-24 h-24 mx-auto object-contain animate-pulse"
            />
          ) : (
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
              <Printer className="w-12 h-12 text-white" />
            </div>
          )}
          
          {/* Spinning Ring */}
          <div className="absolute inset-0 w-24 h-24 mx-auto">
            <div className="w-full h-full border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {companyName}
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Management System
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>

        {/* Loading Text */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading your workspace...
        </p>
      </div>
    </div>
  )
}