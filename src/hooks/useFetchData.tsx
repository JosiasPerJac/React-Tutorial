import { useEffect, useState } from "react";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

interface FetchDataState {
  data: OpenMeteoResponse | undefined;
  loading: boolean;
  error: string | undefined;
}

export default function useFetchData(): FetchDataState {
  const URL =
    "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,wind_speed_10m&timezone=America%2FGuayaquil&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm";

  const [data, setData] = useState<OpenMeteoResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error("No se pudo obtener la información del clima");
        }

        const jsonData: OpenMeteoResponse = await response.json();
        setData(jsonData);
      } catch (error) {
        setError("Ocurrió un error al cargar los datos");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
}