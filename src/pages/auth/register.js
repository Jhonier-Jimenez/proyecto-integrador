import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
  Modal,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";

import { roles } from "src/constants/constants";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };

  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      emailAddress: "",
      role: "Guest",
      surName: "",
      givenName: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().max(255).required("El nombre es requerido"),
      password: Yup.string().max(255).required("La contraseña es requerida"),
      emailAddress: Yup.string()
        .email("El correo no es válido")
        .max(255)
        .required("El correo es requerido"),
      role: Yup.string()
        .max(255)
        .required("Por favor selecciona el rol que tendrá el usuario dentro de la aplicación"),
      surName: Yup.string().max(255).required("El apellido es requerido"),
      givenName: Yup.string().max(255).required("El usuario es requerido"),
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
      try {
        const newUser = await auth.signUp(
          values.userName,
          values.password,
          values.emailAddress,
          values.role,
          values.surName,
          values.givenName
        );
        setShowModal(true);
        console.log(newUser);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  console.log(formik.values);

  return (
    <>
      <Head>
        <title>Registro de muestras y desaparecidos CTI | Crear cuenta</title>
      </Head>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Crear cuenta</Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.userName && formik.errors.userName)}
                  fullWidth
                  helperText={formik.touched.userName && formik.errors.userName}
                  label="Nombre"
                  name="userName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                />
                <TextField
                  error={!!(formik.touched.surName && formik.errors.surName)}
                  fullWidth
                  helperText={formik.touched.surName && formik.errors.surName}
                  label="Apellido"
                  name="surName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.surName}
                />
                <TextField
                  error={!!(formik.touched.givenName && formik.errors.givenName)}
                  fullWidth
                  helperText={formik.touched.givenName && formik.errors.givenName}
                  label="Usuario"
                  name="givenName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.givenName}
                />
                <TextField
                  error={!!(formik.touched.emailAddress && formik.errors.emailAddress)}
                  fullWidth
                  helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                  label="Correo"
                  name="emailAddress"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.emailAddress}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Contraseña"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />

                <TextField
                  error={!!(formik.touched.role && formik.errors.role)}
                  fullWidth
                  helperText={formik.touched.role && formik.errors.role}
                  label="Rol"
                  name="role"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  select
                  SelectProps={{ native: true }}
                >
                  {roles.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continuar
              </Button>
            </form>
          </div>
        </Box>
      </Box>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography gutterBottom variant="h5">
                Información importante
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Nuevo usuario creado exitosamente
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Ahora también puede usarlo para iniciar sesión
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Button onClick={handleClose} fullWidth variant="text">
              Aceptar
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
