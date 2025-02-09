import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { RefreshCcw } from "lucide-react";

const WeatherPage = () => {
  const {
    coordinates,
    isLoading: locationLoading,
    error,
    getLocation,
  } = useGeolocation();
  console.log(coordinates);
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      //reload weather data
    }
  };

  if (locationLoading) {
    //skeleton
  }

  if (error) {
    //show error
  }

  return (
    <div>
      {/* fav cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
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
