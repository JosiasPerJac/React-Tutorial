import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

interface TableUIProps {
  data: OpenMeteoResponse;
}

interface RowData {
  id: number;
  time: string;
  temperature: number;
  windSpeed: number;
}

function formatHour(dateValue: string): string {
  const date = new Date(dateValue);

  return date.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildRows(data: OpenMeteoResponse): RowData[] {
  return data.hourly.time.slice(0, 24).map((time, index) => ({
    id: index + 1,
    time: formatHour(time),
    temperature: data.hourly.temperature_2m[index],
    windSpeed: data.hourly.wind_speed_10m[index],
  }));
}

export default function TableUI({ data }: TableUIProps) {
  const columns: GridColDef<RowData>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "time",
      headerName: "Hora",
      width: 120,
    },
    {
      field: "temperature",
      headerName: `Temperatura (${data.hourly_units.temperature_2m})`,
      width: 180,
    },
    {
      field: "windSpeed",
      headerName: `Viento (${data.hourly_units.wind_speed_10m})`,
      width: 160,
    },
    {
      field: "resumen",
      headerName: "Resumen",
      description: "Resumen de temperatura y viento por hora.",
      sortable: false,
      hideable: false,
      width: 230,
      valueGetter: (_value, row) => {
        return `${row.time}: ${row.temperature} ${data.hourly_units.temperature_2m} / ${row.windSpeed} ${data.hourly_units.wind_speed_10m}`;
      },
    },
  ];

  const rows = buildRows(data);

  return (
    <Box sx={{ height: 350, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
