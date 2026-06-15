import "./App.css";
import { Grid, Typography } from "@mui/material";
import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import SelectorUI from "./components/SelectorUI";
import IndicatorUI from "./components/IndicatorUI";
import TableUI from "./components/TableUI";
import ChartUI from "./components/ChartUI";
import useFetchData from "./hooks/useFetchData";

function App() {
  const { data, loading, error } = useFetchData();

  return (
    <Grid
      container
      spacing={5}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid
        size={{ xs: 12, md: 12 }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <AlertUI description="No se preveen lluvias" />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI />
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} spacing={2}>
        {loading && (
          <Grid size={{ xs: 12 }}>
            <Typography>Cargando datos del clima...</Typography>
          </Grid>
        )}

        {error && (
          <Grid size={{ xs: 12 }}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}

        {data && (
          <>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Temperatura (2m)"
                description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Temperatura aparente"
                description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Velocidad del viento"
                description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title="Humedad relativa"
                description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* Gráfico */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        {data && <ChartUI data={data} />}
      </Grid>

      {/* Tabla */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        {data && <TableUI data={data} />}
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>
        Elemento: Información adicional
      </Grid>
    </Grid>
  );
}

export default App;