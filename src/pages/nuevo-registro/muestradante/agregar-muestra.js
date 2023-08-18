import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Modal,
  Card,
  CardContent,
  CardActions,
  Divider,
  Link,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { SamplesForm } from "src/sections/samples-form/samples-form";
import { SamplesInfo } from "src/sections/samples-form/samples-info";
import { useState } from "react";
import { useRouter } from "next/router";

const Page = () => {
  const [IDMuestra, setIDMuestra] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { documentoIdentidadMuestradante, nombreMuestradante } = router.query;

  const handleSend = async (sendData) => {
    const url = "http://localhost:80/api/Muestra";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });

    const result = await response.json();
    if (result) {
      setIDMuestra(result);
      setShowModal(true);
    }
  };

  const handleContinue = () => {
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>Registro de muestras y desaparecidos CTI | Agregar muestra</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Agregar nueva muestra</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <SamplesInfo
                    documentoIdentidad={documentoIdentidadMuestradante}
                    nombres={nombreMuestradante}
                  />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <SamplesForm
                    onSend={handleSend}
                    documentoIdentidadMuestradante={documentoIdentidadMuestradante}
                  />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>

      <Modal
        open={showModal}
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
                Muestra guardada exitosamente
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Ahora procederá a vincular el muestradante con un desaparecido
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Link
              sx={{
                width: "100%",
              }}
              href={`/nuevo-registro/muestradante/vincular-muestra-desaparecido?muestraId=${IDMuestra}&documentoIdentidadMuestradante=${documentoIdentidadMuestradante}&nombreMuestradante=${nombreMuestradante}`}
            >
              <Button onClick={handleContinue} fullWidth variant="text">
                Continuar
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
