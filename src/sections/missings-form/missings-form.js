import { useCallback, useState } from "react";
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

import { tiposDocumento, genero, departamentos } from "src/constants/constants";

export const MissingsForm = () => {
  const [values, setValues] = useState({
    firstName: "Victor",
    lastName: "Hidalgo",
    email: "victor.hidalgo@fiscalia.gov.co",
    phone: "",
    state: "antioquia",
    country: "Medellín",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Todos los campos marcados con * son obligatorios"
          title="Datos del desaparecido"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Texto de ayuda"
                  label="Nombres"
                  name="nombre"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
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
                  fullWidth
                  label="Número de documento"
                  name="numeroDocumento"
                  onChange={handleChange}
                  type="number"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Sirdec" name="sirdec" onChange={handleChange} />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Departamento de nacimiento"
                  name="departamentoDeNacimiento"
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
                  fullWidth
                  label="Municipio de Nacimiento"
                  name="municipioDeNacimiento"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>

        <CardHeader title="Lugar de la toma del cuerpo" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Departamento de la toma del cuerpo"
                  name="departamentoTomaDelCuerpo"
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
                  fullWidth
                  label="Municipio de la toma del cuerpo"
                  name="municipioTomaDelCuerpo"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Guardar registro</Button>
        </CardActions>
      </Card>
    </form>
  );
};
