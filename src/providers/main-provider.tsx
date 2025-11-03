'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster as Sonner } from '@/components/ui/sonner'

const queryClient = new QueryClient()

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex min-h-screen flex-col">
          <Sonner position="top-center" />
          {children}
        </div>
      </TooltipProvider>
      <ProgressBar height="4px" color="#3F50EC" options={{ showSpinner: false }} shallowRouting />
    </QueryClientProvider>
  )
}

export default MainProvider
