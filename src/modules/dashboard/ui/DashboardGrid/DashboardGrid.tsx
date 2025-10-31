import { useMemo } from 'react'
import type { Block as BlockType } from '@/modules/dashboard/model'
import { GridCell } from './GridCell'
import { calculateGridRows, getBlockAtPosition } from './utils'
import './index.css'

interface DashboardGridProps {
  readonly blocks: readonly BlockType[]
  readonly gridColumns: number
}

export const DashboardGrid = ({ blocks, gridColumns }: DashboardGridProps) => {
  const rows = useMemo(() => calculateGridRows(blocks), [blocks])

  const gridStyle = useMemo(
    () => ({ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }),
    [gridColumns]
  )

  const gridCells = useMemo(
    () =>
      Array.from({ length: rows * gridColumns }, (_, index) => {
        const row = Math.floor(index / gridColumns)
        const col = index % gridColumns
        return (
          <GridCell
            key={`${row}-${col}`}
            row={row}
            col={col}
            block={getBlockAtPosition(blocks, row, col)}
          />
        )
      }),
    [blocks, gridColumns, rows]
  )

  return (
    <div className="dashboard-grid" style={gridStyle}>
      {gridCells}
    </div>
  )
}
