import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import LinkIcon from "@heroicons/react/24/solid/LinkIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Modal,
  Card,
  CardContent,
  CardActions,
  Divider,
  Link,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { LinkSamplesMissingsTable } from "src/sections/link-samples/link-samples-missings-table";
import { LinkSamplesSearch } from "src/sections/link-samples/link-samples-search";
import { applyPagination } from "src/utils/apply-pagination";
import { TotalResults } from "src/sections/overview/totalResults";
import { useRouter } from "next/router";

const searchResult = [];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(searchResult, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const [searchResult, setSearchResult] = useState([]);
  const [linkResult, setLinkResult] = useState({});
  const [desaparecidoId, setDesaparecidoId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { documentoIdentidadMuestradante, nombreMuestradante, muestraId } = router.query;

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleChangeID = (desaparecidoId) => {
    setDesaparecidoId(desaparecidoId);
  };

  const handleSearchByName = async (searchData) => {
    const url = "http://localhost:80/api/desaparecido/filter";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    });

    const result = await response.json();
    setSearchResult(result);
  };

  const handleSearchByID = async (desaparecidoId) => {
    console.log(desaparecidoId);
    const url = `http://localhost:80/api/Desaparecido/muestras/${desaparecidoId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      const result = await response.json();
      setSearchResult(result);
    } catch (error) {
      console.error("The response from the server is empty:", error);
    }
  };

  const handleLink = async () => {
    const requestBody = {
      muestraId: muestraId,
      desaparecidoId: desaparecidoId,
    };
    const url = `http://localhost:80/api/Muestra/vincular`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    console.log(result);
    setLinkResult(result);
    setShowModal(true);
  };

  return (
    <>
      <Head>
        <title>Registro de desaparecidos CTI | Vincular muestra</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="column" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">Vincular muestradante con un desaparecido</Typography>
              <Typography color="text.secondary" variant="h5">
                ¿Cuál es el desaparecido de este muestradante?
              </Typography>
            </Stack>

            <LinkSamplesSearch
              handleSearchByID={handleSearchByID}
              handleSearchByName={handleSearchByName}
              documentoIdentidadMuestradante={documentoIdentidadMuestradante}
              nombreMuestradante={nombreMuestradante}
            />
            {searchResult.length > 0 && (
              <Grid container justifyContent="center" spacing={3}>
                <Grid xs={12} sm={6} lg={3}>
                  <TotalResults
                    difference={16}
                    positive={false}
                    sx={{ height: "100%" }}
                    value={searchResult.length.toString()}
                  />
                </Grid>
              </Grid>
            )}
            {searchResult.length > 0 && (
              <LinkSamplesMissingsTable
                handleChangeID={handleChangeID}
                count={searchResult.length}
                items={searchResult}
                onDeselectAll={customersSelection.handleDeselectAll}
                onDeselectOne={customersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={customersSelection.handleSelectAll}
                onSelectOne={customersSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={customersSelection.selected}
              />
            )}

            {searchResult.length > 0 && (
              <Stack alignItems="center" justifyContent="center" direction="row" spacing={1}>
                <Button
                  onClick={handleLink}
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <LinkIcon />
                    </SvgIcon>
                  }
                >
                  Vincular
                </Button>
              </Stack>
            )}
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
              href="/"
            >
              <Button fullWidth variant="text">
                Regresar al menú principal
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
