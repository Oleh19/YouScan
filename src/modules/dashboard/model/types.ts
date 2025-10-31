export type BlockId = string & { readonly __brand: 'BlockId' }

export const createBlockId = (id: string): BlockId => id as BlockId

export interface GridPosition {
  readonly row: number
  readonly col: number
}

export type BlockType = 'line-chart' | 'bar-chart' | 'text-block'

export interface Block {
  readonly id: BlockId
  readonly type: BlockType
  readonly row: number
  readonly col: number
}

export interface DashboardState {
  readonly blocks: readonly Block[]
  readonly gridColumns: number
}
