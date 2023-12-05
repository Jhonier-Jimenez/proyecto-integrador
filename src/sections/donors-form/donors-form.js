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
import { parentescos } from "src/constants/constants";
import { tiposDocumento, departamentos } from "src/constants/constants";
import { DatePicker } from "@mui/x-date-pickers";

export const DonorsForm = ({ onSend }) => {
  const [values, setValues] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    tipoDocumento: "CC",
    documentoIdentidad: "",
    parentesco: "M",
    fechaNacimiento: "",
    departamento: "amazonas",
    municipio: "",
    direccion: "",
    telefono: "",
  });

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy/MM/dd");
    setValues((prevState) => ({
      ...prevState,
      fechaNacimiento: formattedDate,
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
          title="Datos del muestradante"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  helperText="Nombres separados por un espacio"
                  label="Nombres"
                  name="nombre"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Primer Apellido"
                  name="primerApellido"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Segundo Apellido"
                  name="segundoApellido"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Tipo de Documento"
                  name="tipoDocumento"
                  onChange={handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  {tiposDocumento.map((tipoDocumento) => (
                    <option key={tipoDocumento.value} value={tipoDocumento.value}>
                      {tipoDocumento.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Número de documento"
                  name="documentoIdentidad"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Parentesco"
                  name="parentesco"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                >
                  {parentescos.map((parentesco) => (
                    <option key={parentesco.value} value={parentesco.value}>
                      {parentesco.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <DatePicker
                  required
                  fullWidth
                  label="Fecha de Nacimiento"
                  name="fechaNacimiento"
                  value={values.fechaNacimiento}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Departamento de nacimiento"
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
                  label="Municipio de Nacimiento"
                  name="municipio"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Dirección de residencia"
                  name="direccion"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Teléfono"
                  name="telefono"
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
