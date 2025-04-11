"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Wind, Droplets, Sun, AlertTriangle } from "lucide-react"
import AirQualityGauge from "./air-quality-gauge"
import AirQualityChart from "./air-quality-chart"
import PollutantLevels from "./pollutant-levels"

// Mock data for the dashboard
const locations = [
  { id: "taipei", name: "台北" },
  { id: "taichung", name: "台中" },
  { id: "kaohsiung", name: "高雄" },
  { id: "hsinchu", name: "新竹" },
]

const mockData = {
  taipei: {
    aqi: 42,
    status: "良好",
    statusColor: "green",
    pm25: 12,
    pm10: 28,
    o3: 35,
    no2: 15,
    so2: 3,
    co: 0.4,
    temperature: 24,
    humidity: 65,
    windSpeed: 3.2,
    updated: "2025-04-11 13:30",
    forecast: [
      { time: "上午9點", aqi: 38 },
      { time: "中午12點", aqi: 42 },
      { time: "下午3點", aqi: 45 },
      { time: "下午6點", aqi: 40 },
      { time: "晚上9點", aqi: 35 },
    ],
    history: [
      { date: "4/5", aqi: 45 },
      { date: "4/6", aqi: 50 },
      { date: "4/7", aqi: 48 },
      { date: "4/8", aqi: 42 },
      { date: "4/9", aqi: 38 },
      { date: "4/10", aqi: 40 },
      { date: "4/11", aqi: 42 },
    ],
  },
  taichung: {
    aqi: 58,
    status: "普通",
    statusColor: "yellow",
    pm25: 18,
    pm10: 35,
    o3: 42,
    no2: 18,
    so2: 4,
    co: 0.6,
    temperature: 26,
    humidity: 60,
    windSpeed: 2.8,
    updated: "2025-04-11 13:25",
    forecast: [
      { time: "上午9點", aqi: 52 },
      { time: "中午12點", aqi: 58 },
      { time: "下午3點", aqi: 62 },
      { time: "下午6點", aqi: 55 },
      { time: "晚上9點", aqi: 50 },
    ],
    history: [
      { date: "4/5", aqi: 60 },
      { date: "4/6", aqi: 65 },
      { date: "4/7", aqi: 62 },
      { date: "4/8", aqi: 58 },
      { date: "4/9", aqi: 55 },
      { date: "4/10", aqi: 56 },
      { date: "4/11", aqi: 58 },
    ],
  },
  kaohsiung: {
    aqi: 75,
    status: "對敏感族群不健康",
    statusColor: "orange",
    pm25: 25,
    pm10: 48,
    o3: 55,
    no2: 22,
    so2: 6,
    co: 0.8,
    temperature: 28,
    humidity: 70,
    windSpeed: 2.5,
    updated: "2025-04-11 13:20",
    forecast: [
      { time: "上午9點", aqi: 70 },
      { time: "中午12點", aqi: 75 },
      { time: "下午3點", aqi: 80 },
      { time: "下午6點", aqi: 72 },
      { time: "晚上9點", aqi: 68 },
    ],
    history: [
      { date: "4/5", aqi: 78 },
      { date: "4/6", aqi: 82 },
      { date: "4/7", aqi: 80 },
      { date: "4/8", aqi: 75 },
      { date: "4/9", aqi: 72 },
      { date: "4/10", aqi: 74 },
      { date: "4/11", aqi: 75 },
    ],
  },
  hsinchu: {
    aqi: 35,
    status: "良好",
    statusColor: "green",
    pm25: 10,
    pm10: 22,
    o3: 30,
    no2: 12,
    so2: 2,
    co: 0.3,
    temperature: 23,
    humidity: 68,
    windSpeed: 4.5,
    updated: "2025-04-11 13:35",
    forecast: [
      { time: "上午9點", aqi: 32 },
      { time: "中午12點", aqi: 35 },
      { time: "下午3點", aqi: 38 },
      { time: "下午6點", aqi: 34 },
      { time: "晚上9點", aqi: 30 },
    ],
    history: [
      { date: "4/5", aqi: 38 },
      { date: "4/6", aqi: 40 },
      { date: "4/7", aqi: 37 },
      { date: "4/8", aqi: 35 },
      { date: "4/9", aqi: 32 },
      { date: "4/10", aqi: 34 },
      { date: "4/11", aqi: 35 },
    ],
  },
}

export default function AirQualityDashboard() {
  const [selectedLocation, setSelectedLocation] = useState("taipei")
  const data = mockData[selectedLocation as keyof typeof mockData]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "良好":
        return "text-green-500"
      case "普通":
        return "text-yellow-500"
      case "對敏感族群不健康":
        return "text-orange-500"
      case "不健康":
        return "text-red-500"
      case "非常不健康":
        return "text-purple-500"
      case "危險":
        return "text-rose-700"
      default:
        return "text-green-500"
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "良好":
        return "bg-green-100"
      case "普通":
        return "bg-yellow-100"
      case "對敏感族群不健康":
        return "bg-orange-100"
      case "不健康":
        return "bg-red-100"
      case "非常不健康":
        return "bg-purple-100"
      case "危險":
        return "bg-rose-100"
      default:
        return "bg-green-100"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">空氣品質監測儀表板</h1>
          <p className="text-muted-foreground">即時監測台灣各地空氣品質狀況，保護您的健康</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="選擇地點" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>空氣品質指數 (AQI)</CardTitle>
            <CardDescription>最後更新時間: {data.updated}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <AirQualityGauge value={data.aqi} />
              <div className={`text-center px-4 py-2 rounded-full ${getStatusBgColor(data.status)}`}>
                <span className={`text-lg font-medium ${getStatusColor(data.status)}`}>{data.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>環境條件</CardTitle>
            <CardDescription>當前氣象狀況</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium">溫度</span>
                </div>
                <span className="font-medium">{data.temperature}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">濕度</span>
                </div>
                <span className="font-medium">{data.humidity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-slate-500" />
                  <span className="text-sm font-medium">風速</span>
                </div>
                <span className="font-medium">{data.windSpeed} m/s</span>
              </div>
              {data.aqi > 70 && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">健康提醒</p>
                    <p className="text-xs text-amber-700">
                      敏感族群應減少戶外活動，一般民眾如有不適，應考慮減少戶外活動。
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pollutants">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pollutants">污染物濃度</TabsTrigger>
          <TabsTrigger value="trends">趨勢分析</TabsTrigger>
        </TabsList>
        <TabsContent value="pollutants" className="mt-4">
          <PollutantLevels data={data} />
        </TabsContent>
        <TabsContent value="trends" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>今日預測</CardTitle>
                <CardDescription>未來24小時AQI預測</CardDescription>
              </CardHeader>
              <CardContent>
                <AirQualityChart data={data.forecast} dataKey="aqi" xAxisKey="time" title="AQI" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>歷史趨勢</CardTitle>
                <CardDescription>過去7天AQI變化</CardDescription>
              </CardHeader>
              <CardContent>
                <AirQualityChart data={data.history} dataKey="aqi" xAxisKey="date" title="AQI" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
