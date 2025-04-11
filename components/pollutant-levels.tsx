"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PollutantData {
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  [key: string]: number | string;
}

interface PollutantLevelsProps {
  data: PollutantData;
}

export default function PollutantLevels({ data }: PollutantLevelsProps) {
  const pollutants = [
    {
      id: "pm25",
      name: "PM2.5",
      value: data.pm25,
      unit: "μg/m³",
      max: 75,
      description: "細懸浮微粒",
      info: "直徑小於或等於2.5微米的懸浮微粒，可深入肺部及血液",
    },
    {
      id: "pm10",
      name: "PM10",
      value: data.pm10,
      unit: "μg/m³",
      max: 150,
      description: "懸浮微粒",
      info: "直徑小於或等於10微米的懸浮微粒",
    },
    {
      id: "o3",
      name: "O₃",
      value: data.o3,
      unit: "ppb",
      max: 125,
      description: "臭氧",
      info: "強氧化性氣體，可能導致呼吸道問題",
    },
    {
      id: "no2",
      name: "NO₂",
      value: data.no2,
      unit: "ppb",
      max: 100,
      description: "二氧化氮",
      info: "主要來自車輛排放，可能導致呼吸道問題",
    },
    {
      id: "so2",
      name: "SO₂",
      value: data.so2,
      unit: "ppb",
      max: 75,
      description: "二氧化硫",
      info: "主要來自工業排放，可能導致呼吸道問題",
    },
    {
      id: "co",
      name: "CO",
      value: data.co,
      unit: "ppm",
      max: 9,
      description: "一氧化碳",
      info: "無色無味有毒氣體，主要來自不完全燃燒",
    },
  ];

  const getProgressColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage <= 33) return "bg-green-500";
    if (percentage <= 66) return "bg-yellow-500";
    if (percentage <= 100) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pollutants.map((pollutant) => (
        <Card key={pollutant.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-lg">{pollutant.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {pollutant.description}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold">{pollutant.value}</span>
                <span className="text-sm text-muted-foreground ml-1">
                  {pollutant.unit}
                </span>
              </div>
            </div>
            <Progress
              value={(pollutant.value / pollutant.max) * 100}
              className="h-2 mb-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {pollutant.info}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
