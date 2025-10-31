import type { BlockId } from '@/modules/dashboard/model'

export interface DragItem {
  readonly id: BlockId
  readonly row: number
  readonly col: number
}

export const DRAG_TYPE = 'block' as const

