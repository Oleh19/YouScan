export interface ChartDataPoint {
  readonly name: string
  readonly value: number
}

export interface BarChartDataPoint {
  readonly name: string
  readonly value: number
  readonly color: string
  readonly label: string
}

export interface TextBlockData {
  readonly title: string
  readonly text: string
}

export const LINE_CHART_MOCK_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
] satisfies readonly ChartDataPoint[]

export const LINE_CHART_TITLE = 'Line Chart'

export const BAR_CHART_MOCK_DATA = [
  { name: 'A', value: 450, color: '#ffc658', label: 'Neutral' },
  { name: 'B', value: 320, color: '#ff6b6b', label: 'Negative' },
  { name: 'C', value: 680, color: '#82ca9d', label: 'Positive' },
] satisfies readonly BarChartDataPoint[]

export const BAR_CHART_TITLE = 'Bar Chart'

export const TEXT_BLOCK_MOCK_DATA = {
  title: 'Text Block Title',
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.`,
} as const satisfies TextBlockData

