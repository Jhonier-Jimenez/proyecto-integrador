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

import { useAuth } from "src/hooks/use-auth";

const states = [
  {
    value: "antioquia",
    label: "Antioquia",
  },
  {
    value: "valle",
    label: "Valle",
  },
  {
    value: "bogota",
    label: "Bogotá",
  },
  {
    value: "santander",
    label: "Santander",
  },
];

export const AccountProfileDetails = () => {
  const auth = useAuth();
  const {user} = auth

  const [values, setValues] = useState({
    firstName: user.username,
    lastName: user.surname,
    email: user.emailAddress,
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
        <CardHeader subheader="La información puede ser editada" title="Información del Perfil" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Texto de ayuda"
                  label="Nombres"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Apellidos"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Número de teléfono o celular"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Departamento"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        {user.role == "Administrator" ? <><Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Guardar los cambios</Button>
        </CardActions></> : null}
        
      </Card>
    </form>
  );
};
