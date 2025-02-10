import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import {
  useForecastQuery,
  useReverseGeoCodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { AlertTriangle, RefreshCcw } from "lucide-react";

const WeatherPage = () => {
  const {
    coordinates,
    isLoading: locationLoading,
    error,
    getLocation,
  } = useGeolocation();

  const locationQuery = useReverseGeoCodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  //console.log(locationQuery);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      locationQuery.refetch();
      forecastQuery.refetch();
    }
  };

  if (locationLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p> {error}</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>
          <p> PLease enable location access to see your local weather.</p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      {/* fav cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location </h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          //disabled={}
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WeatherPage;
