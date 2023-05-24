import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { DonorsSamplesTable } from "src/sections/samples-tables/donors-samples-table";
import { applyPagination } from "src/utils/apply-pagination";
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

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const router = useRouter();
  const { muestradanteID } = router.query;

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const url = `http://localhost:80/api/Muestradante/muestra/${muestradanteID}`;

    const fetchData = async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      setSearchResult(result);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Registro de muestras CTI | Muestras del muestradante</title>
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
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  Datos de la muestra otorgada por el muestradante
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Agregar
                </Button>
              </div>
            </Stack>
            {searchResult && (
              <Card sx={{ p: 2 }}>
                <CardHeader subheader={muestradanteID} title="ID del muestradante" />
                <CardContent>
                  <Typography variant="h6">Datos del muestradante</Typography>
                  <Stack direction="column">
                    <Typography color="text.secondary" variant="overline">
                      Nombres: {searchResult.nombre}
                    </Typography>
                    <Typography color="text.secondary" variant="overline">
                      Número de documento: {searchResult.documentoIdentidad}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            )}

            {searchResult && (
              <>
                <DonorsSamplesTable item={searchResult.muestra} />

                <Stack alignItems="center" justifyContent="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Exportar
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
