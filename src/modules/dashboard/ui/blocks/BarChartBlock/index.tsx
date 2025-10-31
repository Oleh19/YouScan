import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { BarChartDataPoint } from '@/modules/dashboard/infrastructure'
import './index.css'

interface BarChartBlockProps {
  readonly title?: string
  readonly data?: readonly BarChartDataPoint[]
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) => {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div className="bar-chart-block__tooltip">
      {payload[0]?.value}
    </div>
  )
}

export const BarChartBlock = ({ title = 'Bar Chart', data = [] }: BarChartBlockProps) => {
  return (
    <div className="bar-chart-block">
      <h3 className="bar-chart-block__title">{title}</h3>
      <div className="bar-chart-block__chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data as BarChartDataPoint[]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis hide />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bar-chart-block__legend">
        {data.map((item, index) => (
          <div key={index} className="bar-chart-block__legend-item">
            <span 
              className="bar-chart-block__legend-color" 
              style={{ backgroundColor: item.color }}
            />
            <span className="bar-chart-block__legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

