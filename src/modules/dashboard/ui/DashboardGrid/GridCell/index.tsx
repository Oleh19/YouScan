import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { DashboardBlock } from '../../blocks/Block'
import { useDashboardContext } from '@/modules/dashboard/hooks'
import { type Block as BlockType, DRAG_TYPE, type DragItem } from '@/modules/dashboard/model'

interface GridCellProps {
  readonly row: number
  readonly col: number
  readonly block: BlockType | null
}

export const GridCell = ({ row, col, block }: GridCellProps) => {
  const { moveBlock, deleteBlock } = useDashboardContext()
  const ref = useRef<HTMLDivElement>(null)

  const [{ isOver, canDrop }, drop] = useDrop<DragItem, void, { isOver: boolean; canDrop: boolean }>({
    accept: DRAG_TYPE,
    drop: (item: DragItem) => {
      if (item.row !== row || item.col !== col) {
        moveBlock(item.id, row, col)
      }
    },
    canDrop: () => {
      return !block
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  drop(ref)

  const handleDelete = (id: BlockType['id']) => {
    deleteBlock(id)
  }

  const cellClassName = [
    'grid-cell',
    isOver && canDrop && 'grid-cell--drop-target',
    isOver && !canDrop && 'grid-cell--drop-invalid',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={cellClassName}>
      {block && <DashboardBlock block={block} onDelete={handleDelete} />}
    </div>
  )
}
