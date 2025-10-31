import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartDataPoint } from '@/modules/dashboard/infrastructure'
import { COLORS } from '@/shared/styles/constants'
import './index.css'

interface LineChartBlockProps {
  readonly title?: string
  readonly data?: readonly ChartDataPoint[]
}

export const LineChartBlock = ({ title = 'Line Chart', data = [] }: LineChartBlockProps) => {
  return (
    <div className="line-chart-block">
      <h3 className="line-chart-block__title">{title}</h3>
      <div className="line-chart-block__chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data as ChartDataPoint[]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={COLORS.PRIMARY} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

