import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

interface ChartUIProps {
  data: OpenMeteoResponse;
}

function formatHour(dateValue: string): string {
  const date = new Date(dateValue);

  return date.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChartUI({ data }: ChartUIProps) {
  const labels = data.hourly.time.slice(0, 24).map((time) => formatHour(time));
  const temperatures = data.hourly.temperature_2m.slice(0, 24);
  const windSpeeds = data.hourly.wind_speed_10m.slice(0, 24);

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Temperatura y viento por hora
      </Typography>

      <LineChart
        height={300}
        series={[
          {
            data: temperatures,
            label: `Temperatura (${data.hourly_units.temperature_2m})`,
          },
          {
            data: windSpeeds,
            label: `Viento (${data.hourly_units.wind_speed_10m})`,
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: labels,
          },
        ]}
      />
    </>
  );
}