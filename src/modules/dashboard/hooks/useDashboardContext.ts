import { useContext } from 'react'
import { DashboardContext, type DashboardContextValue } from '../context/DashboardContext.types'

export const useDashboardContext = (): DashboardContextValue => {
  const context = useContext(DashboardContext)
  if (context === null) {
    throw new Error('useDashboardContext must be used within DashboardProvider')
  }
  return context
}
