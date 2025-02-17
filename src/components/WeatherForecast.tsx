import type { ForecastData, DailyForecast } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { motion } from "framer-motion"; // Import Framer Motion

interface WeatherForecastProp {
  data: ForecastData;
}

const WeatherForecast = ({ data }: WeatherForecastProp) => {
  const dailyForecast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyy-mm-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForecast).splice(0, 6);

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card>
      <CardHeader>
        <CardTitle> Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day, index) => {
            return (
              <motion.div
                key={day.date}
                className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4 transition-transform duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div>
                  <p className="font-medium">
                    {format(new Date(day.date * 1000), "EEE, MMM d")}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {day.weather.description}
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <span className="flex items-center text-blue-400">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center text-orange-400">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>
                <div className="flex justify-center gap-4">
                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">{day.humidity}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">{day.wind} m/s</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
