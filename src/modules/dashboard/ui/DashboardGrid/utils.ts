import type { Block } from '@/modules/dashboard/model'

export const getBlockAtPosition = (
  blocks: readonly Block[],
  row: number,
  col: number
): Block | null => {
  return blocks.find(b => b.row === row && b.col === col) ?? null
}

export const calculateGridRows = (blocks: readonly Block[]): number => {
  if (blocks.length === 0) {
    return 0
  }
  const maxRow = blocks.reduce((max, block) => Math.max(max, block.row), -1)
  return maxRow + 1
}

