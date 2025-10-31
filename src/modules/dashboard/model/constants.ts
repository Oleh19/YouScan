import type { BlockType } from './types'

export const GRID_COLUMNS = 3

export const BLOCK_TYPES = {
  LINE_CHART: 'line-chart',
  BAR_CHART: 'bar-chart',
  TEXT_BLOCK: 'text-block',
} as const satisfies Record<string, BlockType>

export const BLOCK_TYPE_METADATA: Readonly<Record<BlockType, { readonly label: string }>> = {
  [BLOCK_TYPES.LINE_CHART]: { label: 'Add Line Chart' },
  [BLOCK_TYPES.BAR_CHART]: { label: 'Add Bar Chart' },
  [BLOCK_TYPES.TEXT_BLOCK]: { label: 'Add Text Block' },
} as const

export const BLOCK_TYPES_LIST = Object.entries(BLOCK_TYPE_METADATA).map(([type, metadata]) => ({
  type: type as BlockType,
  label: metadata.label,
})) as readonly { readonly type: BlockType; readonly label: string }[]

