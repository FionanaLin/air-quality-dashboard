"use client";

import { useEffect, useState } from "react";

interface AirQualityGaugeProps {
  value: number;
}

export default function AirQualityGauge({ value }: AirQualityGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  // Calculate the angle for the gauge needle
  const angle = (animatedValue / 300) * 180;

  // Determine color based on AQI value
  const getColor = (aqi: number) => {
    if (aqi <= 50) return "#10B981"; // Green - Good
    if (aqi <= 100) return "#FBBF24"; // Yellow - Moderate
    if (aqi <= 150) return "#F97316"; // Orange - Unhealthy for Sensitive Groups
    if (aqi <= 200) return "#EF4444"; // Red - Unhealthy
    if (aqi <= 300) return "#8B5CF6"; // Purple - Very Unhealthy
    return "#BE123C"; // Dark Red - Hazardous
  };

  const color = getColor(animatedValue);

  return (
    <div className="relative w-64 h-32 mx-auto">
      {/* Gauge background */}
      <div className="absolute w-full h-full overflow-hidden rounded-t-full">
        {/* Background */}
        <div className="absolute bottom-0 w-full h-full bg-gray-100"></div>

        {/* Color segments */}
        <div className="absolute bottom-0 left-0 w-full h-full">
          <div className="absolute bottom-0 left-0 w-1/6 h-full bg-green-500 opacity-20"></div>
          <div className="absolute bottom-0 left-1/6 w-1/6 h-full bg-yellow-500 opacity-20"></div>
          <div className="absolute bottom-0 left-2/6 w-1/6 h-full bg-orange-500 opacity-20"></div>
          <div className="absolute bottom-0 left-3/6 w-1/6 h-full bg-red-500 opacity-20"></div>
          <div className="absolute bottom-0 left-4/6 w-1/6 h-full bg-purple-500 opacity-20"></div>
          <div className="absolute bottom-0 left-5/6 w-1/6 h-full bg-rose-700 opacity-20"></div>
        </div>
      </div>
      {/* Gauge needle */}
      <div
        className="absolute bottom-0 left-1/2 w-1 h-[95%] bg-gray-800 rounded-t-full origin-bottom transform -translate-x-1/2"
        style={{ transform: `translateX(-50%) rotate(${angle - 90}deg)` }}
      >
        <div className="absolute top-0 left-1/2 w-3 h-3 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Center point */}
      <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

      {/* Value display */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-4xl font-bold" style={{ color }}>
          {Math.round(animatedValue)}
        </div>
        <div className="text-sm text-gray-500">AQI</div>
      </div>

      {/* Scale markers */}
      <div className="absolute bottom-0 w-full">
        <div className="absolute bottom-0 left-0 text-xs text-gray-500">0</div>
        <div className="absolute bottom-0 left-1/3 transform -translate-x-1/2 text-xs text-gray-500">
          100
        </div>
        <div className="absolute bottom-0 left-2/3 transform -translate-x-1/2 text-xs text-gray-500">
          200
        </div>
        <div className="absolute bottom-0 right-0 transform translate-x-0 text-xs text-gray-500">
          300
        </div>
      </div>
    </div>
  );
}
