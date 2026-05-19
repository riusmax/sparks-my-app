import { onlineManager, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import * as Network from 'expo-network'
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: (failureCount, error) => {
        if (error instanceof Error && /HTTP 4\d\d/.test(error.message)) {
          return false; // Ne pas réessayer pour les erreurs 404
        }
        if (error instanceof Error && /HTTP 5\d\d/.test(error.message)) {
          return false; // Ne pas réessayer pour les erreurs 500
        }
        return failureCount < 2; // Réessayer jusqu'à 2 fois pour les autres erreurs
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff jusqu'à 30s
    }
  }
})

function setupNetworkListener() {
  return Network.addNetworkStateListener(state => {
    onlineManager.setOnline(state.isConnected ?? false)
  })
}

function QueryProvider ({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const subscription = setupNetworkListener()
    return () => subscription?.remove()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export {
  QueryProvider,
  queryClient
}