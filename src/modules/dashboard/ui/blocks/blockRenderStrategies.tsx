import { lazy, memo, type ReactElement, Suspense } from 'react'
import type { BlockType } from '@/modules/dashboard/model'
import { BAR_CHART_MOCK_DATA, BAR_CHART_TITLE, LINE_CHART_MOCK_DATA, LINE_CHART_TITLE, TEXT_BLOCK_MOCK_DATA } from '@/modules/dashboard/infrastructure'
import { LoadingSpinner } from '@/shared/ui'
import { TextBlock } from './TextBlock'

const LineChartBlock = lazy(() =>
  import('./LineChartBlock').then(module => ({ default: module.LineChartBlock }))
)

const BarChartBlock = lazy(() =>
  import('./BarChartBlock').then(module => ({ default: module.BarChartBlock }))
)

interface BlockContentProps {
  readonly type: BlockType
}

const blockRenderStrategies: Record<BlockType, () => ReactElement> = {
  'line-chart': () => (
    <Suspense fallback={<LoadingSpinner size="sm" />}>
      <LineChartBlock title={LINE_CHART_TITLE} data={LINE_CHART_MOCK_DATA} />
    </Suspense>
  ),
  'bar-chart': () => (
    <Suspense fallback={<LoadingSpinner size="sm" />}>
      <BarChartBlock title={BAR_CHART_TITLE} data={BAR_CHART_MOCK_DATA} />
    </Suspense>
  ),
  'text-block': () => <TextBlock title={TEXT_BLOCK_MOCK_DATA.title} text={TEXT_BLOCK_MOCK_DATA.text} />,
}

const BlockContentComponent = ({ type }: BlockContentProps): ReactElement => {
  const renderStrategy = blockRenderStrategies[type]
  return renderStrategy()
}

export const BlockContent = memo(BlockContentComponent)
