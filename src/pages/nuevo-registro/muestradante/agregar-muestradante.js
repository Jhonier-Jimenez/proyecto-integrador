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
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { DonorsForm } from "src/sections/donors-form/donors-form";
import { DonorsFormInfo } from "src/sections/donors-form/donors-form-info";
import { useState } from "react";

const Page = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (searchData) => {
    const url = "http://localhost:80/api/Desaparecido";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    });

    const result = await response.json();
    if (result) {
      setShowModal(true);
    }
    setSearchResult(result);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>Registro de muestras y desaparecidos CTI | Agregar muestradante</title>
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
              <Typography variant="h4">Agregar nuevo muestradante</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <DonorsFormInfo />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <DonorsForm onSearch={handleSearch} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
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
                Registro guardado exitosamente
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Ahora procederá a agregar una muestra asociada
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Button onClick={handleClose} fullWidth variant="text">
              Continuar
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
