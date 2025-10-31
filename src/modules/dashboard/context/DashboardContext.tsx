import { type ReactNode, useCallback, useState } from 'react'
import {
  addBlockToState,
  type BlockId,
  type BlockType,
  createBlock,
  createInitialState,
  type DashboardState,
  findFirstAvailablePosition,
  isValidPosition,
  moveBlockInState,
  removeBlockFromState,
} from '@/modules/dashboard/model'
import { DashboardContext } from './DashboardContext.types'

interface DashboardProviderProps {
  readonly children: ReactNode
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [state, setState] = useState<DashboardState>(createInitialState())

  const addBlock = useCallback(
    (type: BlockType) => {
      setState(prevState => {
        const position = findFirstAvailablePosition(prevState.blocks, prevState.gridColumns)
        const newBlock = createBlock(type, position)
        return addBlockToState(prevState, newBlock)
      })
    },
    []
  )

  const deleteBlock = useCallback(
    (id: BlockId) => {
      setState(prevState => removeBlockFromState(prevState, id))
    },
    []
  )

  const moveBlock = useCallback(
    (id: BlockId, row: number, col: number) => {
      setState(prevState => {
        if (!isValidPosition(prevState.blocks, row, col, id)) {
          return prevState
        }

        return moveBlockInState(prevState, id, row, col)
      })
    },
    []
  )

  return (
    <DashboardContext.Provider value={{ state, addBlock, deleteBlock, moveBlock }}>
      {children}
    </DashboardContext.Provider>
  )
}

