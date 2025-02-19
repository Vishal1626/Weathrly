import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Layout from "./components/layout";
import { ThemeProvider } from "./context/theme-provide";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoadingSkeleton from "./components/LoadingSkeleton";

// Lazy load pages
const WeatherPage = lazy(() => import("./pages/weather-page"));
const CityPage = lazy(() => import("./pages/city-page"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            {/* Suspense fallback UI while components are loading */}
            <Suspense fallback={<LoadingSkeleton />}>
              <Routes>
                <Route path="/" element={<WeatherPage />} />
                <Route path="/city/:cityName" element={<CityPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
