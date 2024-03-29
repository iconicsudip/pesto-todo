
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true
    }
  }
});

function App({children}:{children: React.ReactNode}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  )
}

export default App
