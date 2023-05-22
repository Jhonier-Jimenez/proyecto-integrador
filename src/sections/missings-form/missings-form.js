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

import { tiposDocumento, generos, departamentos } from "src/constants/constants";

export const MissingsForm = ({ onSend }) => {
  const [values, setValues] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    tipoDocumento: "cedulaDeCiudadania",
    documentoIdentidad: "",
    genero: "masculino",
    sirdec: "",
    lugarNacimientoDepartamento: "amazonas",
    lugarNacimientoMunicipio: "",
    lugarTomaCuerpoDepartamento: "amazonas",
    lugarTomaCuerpoMunicipio: "",
  });

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
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
          title="Datos del desaparecido"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Nombres separados por un espacio"
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
                  name="documentoIdentidad"
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Género"
                  name="genero"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                >
                  {generos.map((genero) => (
                    <option key={genero.value} value={genero.value}>
                      {genero.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Sirdec"
                  name="sirdec"
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Departamento de nacimiento"
                  name="lugarNacimientoDepartamento"
                  onChange={handleChange}
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
                  name="lugarNacimientoMunicipio"
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
                  name="lugarTomaCuerpoDepartamento"
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
                  name="lugarTomaCuerpoMunicipio"
                  onChange={handleChange}
                  required
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
