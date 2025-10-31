import { lazy, Suspense } from 'react'
import { ErrorBoundary, LoadingSpinner } from '@/shared/ui'
import { DashboardProvider } from '@/modules/dashboard'

const Dashboard = lazy(() =>
  import('@/modules/dashboard').then(module => ({ default: module.Dashboard }))
)

function App() {
  return (
    <ErrorBoundary errorBoundaryName="App">
      <DashboardProvider>
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <Dashboard />
        </Suspense>
      </DashboardProvider>
    </ErrorBoundary>
  )
}

export default App
