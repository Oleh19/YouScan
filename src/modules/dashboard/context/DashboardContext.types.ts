import { createContext } from 'react'
import type { BlockId, BlockType, DashboardState } from '@/modules/dashboard/model'

export interface DashboardContextValue {
  readonly state: DashboardState
  readonly addBlock: (type: BlockType) => void
  readonly deleteBlock: (id: BlockId) => void
  readonly moveBlock: (id: BlockId, row: number, col: number) => void
}

export const DashboardContext = createContext<DashboardContextValue | null>(null)
