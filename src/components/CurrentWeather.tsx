import type { GeoCodingResponse, WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { motion } from "framer-motion";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeoCodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [CurrentWeather],
    main: { temp, temp_min, temp_max, feels_like, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-8">
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-end">
                <h2 className="text-3xl font-bold tracking-tighter">
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className="text-muted-foreground ml-1">
                    , {locationName.state}
                  </span>
                )}
              </div>
              <p className="text-base text-muted-foreground">
                {locationName?.country}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-8xl font tracking-tighter">
                {formatTemp(temp)}
              </p>
              <div className="space-y-2">
                <p className="text-base font-medium text-muted-foreground">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-2 text-base font-medium">
                  <span className="flex items-center gap-1 text-blue-400">
                    <ArrowDown className="h-5 w-5" />
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-orange-400">
                    <ArrowUp className="h-5 w-5" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex gap-3 items-center">
                <Droplets className="h-6 w-6 text-blue-500" />
                <div className="space-y-1">
                  <p className="text-base font-medium">Humidity</p>
                  <p className="text-base font-medium text-muted-foreground">
                    {humidity}%
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Wind className="h-6 w-6 text-green-500" />
                <div className="space-y-1">
                  <p className="text-base font-medium">Wind Speed</p>
                  <p className="text-base font-medium text-muted-foreground">
                    {speed} m/s
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="relative flex aspect-square w-full max-w-[200px] items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`}
                alt={CurrentWeather.description}
                className="w-full h-full"
              />
              <div className="absolute bottom-0 text-center bg-black bg-opacity-50 text-white p-1 rounded">
                <p className="text-sm font-medium capitalize">
                  {CurrentWeather.description}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
