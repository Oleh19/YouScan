import {
  type Block,
  type BlockId,
  createBlockId,
  type DashboardState,
  type GridPosition,
} from './types'
import { GRID_COLUMNS } from './constants'

export const generateBlockId = (): BlockId => {
  return createBlockId(`block-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`)
}

export const findFirstAvailablePosition = (
  blocks: readonly Block[],
  gridColumns: number
): GridPosition => {
  const occupied = new Set(blocks.map(b => `${b.row}-${b.col}`))

  const maxRow = blocks.length > 0 
    ? Math.max(...blocks.map(b => b.row))
    : -1

  for (let row = 0; row <= maxRow + 1; row++) {
    for (let col = 0; col < gridColumns; col++) {
      if (!occupied.has(`${row}-${col}`)) {
        return { row, col }
      }
    }
  }

  return { row: maxRow + 1, col: 0 }
}

export const isValidPosition = (
  blocks: readonly Block[],
  row: number,
  col: number,
  excludeId?: BlockId
): boolean => {
  return !blocks.some(block => block.row === row && block.col === col && block.id !== excludeId)
}

export const createInitialState = (gridColumns: number = GRID_COLUMNS): DashboardState => ({
  blocks: [],
  gridColumns,
})

export const createBlock = (type: Block['type'], position: GridPosition): Block => {
  return {
    id: generateBlockId(),
    type,
    row: position.row,
    col: position.col,
  }
}

export const addBlockToState = (prevState: DashboardState, block: Block): DashboardState => {
  return {
    ...prevState,
    blocks: [...prevState.blocks, block],
  }
}

export const removeBlockFromState = (prevState: DashboardState, id: BlockId): DashboardState => {
  return {
    ...prevState,
    blocks: prevState.blocks.filter(block => block.id !== id),
  }
}

export const moveBlockInState = (
  prevState: DashboardState,
  id: BlockId,
  row: number,
  col: number
): DashboardState => {
  return {
    ...prevState,
    blocks: prevState.blocks.map(block => (block.id === id ? { ...block, row, col } : block)),
  }
}
