import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { format } from "date-fns";

import {
  departamentos,
  tiposDeMuestra,
  estadosDeMuestra,
  consentimientoPoblacional,
} from "src/constants/constants";
import { DatePicker } from "@mui/x-date-pickers";

export const SamplesForm = ({ onSend, documentoIdentidadMuestradante }) => {
  const [values, setValues] = useState({
    radicadoInterno: "",
    tipoMuestra: "SSANGRE_FTA",
    estadoMuestra: "valida",
    fechaTomaMuestra: "",
    consentimientoPoblacional: "true",
    fechaLlegadaLaboratorio: "",
    departamento: "amazonas",
    municipio: "",
    documentoIdentidadMuestradante: documentoIdentidadMuestradante,
  });

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDateChangeTaken = (date) => {
    const formattedDate = format(date, "yyyy/MM/dd");
    setValues((prevState) => ({
      ...prevState,
      fechaTomaMuestra: formattedDate,
    }));
  };

  const handleDateChangeArrival = (date) => {
    const formattedDate = format(date, "yyyy/MM/dd");
    setValues((prevState) => ({
      ...prevState,
      fechaLlegadaLaboratorio: formattedDate,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSend(values);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Todos los campos marcados con * son obligatorios"
          title="Datos de la muestra"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Radicado Interno"
                  name="radicadoInterno"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Tipo de muestra"
                  name="tipoMuestra"
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  {tiposDeMuestra.map((tipoMuestra) => (
                    <option key={tipoMuestra.value} value={tipoMuestra.value}>
                      {tipoMuestra.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Estado de la muestra"
                  name="estadoMuestra"
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  {estadosDeMuestra.map((estadoMuestra) => (
                    <option key={estadoMuestra.value} value={estadoMuestra.value}>
                      {estadoMuestra.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  required
                  fullWidth
                  label="Fecha de toma de la muestra"
                  name="fechaTomaMuestra"
                  value={values.fechaTomaMuestra}
                  onChange={handleDateChangeTaken}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  required
                  fullWidth
                  label="Fecha de llegada al laboratorio"
                  name="fechaLlegadaLaboratorio"
                  value={values.fechaLlegadaLaboratorio}
                  onChange={handleDateChangeArrival}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Consentimiento poblacional"
                  name="consentimientoPoblacional"
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  {consentimientoPoblacional.map((consentimiento) => (
                    <option key={consentimiento.value} value={consentimiento.value}>
                      {consentimiento.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Departamento de toma de la muestra"
                  name="departamento"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                >
                  {departamentos.map((departamento) => (
                    <option key={departamento.value} value={departamento.value}>
                      {departamento.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Municipio de toma de la muestra"
                  name="municipio"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>

        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Guardar registro
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
