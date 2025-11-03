import { useRef, useState } from 'react'
import { useDrag } from 'react-dnd'
import {
  type BlockId,
  type Block as BlockType,
  DRAG_TYPE,
  type DragItem,
} from '@/modules/dashboard/model'
import { BlockContent } from '../blockRenderStrategies'
import './index.css'

interface BlockProps {
  readonly block: BlockType
  readonly onDelete: (id: BlockId) => void
}

export const DashboardBlock = ({ block, onDelete }: BlockProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: DRAG_TYPE,
    item: { id: block.id, row: block.row, col: block.col },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(ref)

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onDelete(block.id)
  }

  const blockClassName = ['dashboard-block', isDragging && 'dashboard-block--dragging']
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={ref}
      className={blockClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <button
          className="dashboard-block__delete"
          onClick={handleDelete}
          aria-label="Delete block"
          type="button"
        >
          ×
        </button>
      )}
      <BlockContent type={block.type} />
    </div>
  )
}
