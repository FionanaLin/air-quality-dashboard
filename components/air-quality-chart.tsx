"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ChartData {
  [key: string]: string | number
}

interface AirQualityChartProps {
  data: ChartData[]
  dataKey: string
  xAxisKey: string
  title: string
}

export default function AirQualityChart({ data, dataKey, xAxisKey, title }: AirQualityChartProps) {
  // Determine color based on average AQI value
  const avgValue = data.reduce((sum, item) => sum + (Number(item[dataKey]) || 0), 0) / data.length

  const getColor = (aqi: number) => {
    if (aqi <= 50) return "#10B981" // Green - Good
    if (aqi <= 100) return "#FBBF24" // Yellow - Moderate
    if (aqi <= 150) return "#F97316" // Orange - Unhealthy for Sensitive Groups
    if (aqi <= 200) return "#EF4444" // Red - Unhealthy
    if (aqi <= 300) return "#8B5CF6" // Purple - Very Unhealthy
    return "#BE123C" // Dark Red - Hazardous
  }

  const lineColor = getColor(avgValue)

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} domain={[0, "dataMax + 20"]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #f0f0f0",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value) => [`${value} ${title}`, title]}
            labelFormatter={(label) => `${label}`}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={lineColor}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2, fill: "white" }}
            activeDot={{ r: 6, strokeWidth: 0, fill: lineColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
