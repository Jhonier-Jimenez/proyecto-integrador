import { useCallback, useMemo, useState } from "react";
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
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { DonorsTable } from "src/sections/donors/donors-table";
import { DonorsSearch } from "src/sections/donors/donors-search";
import { applyPagination } from "src/utils/apply-pagination";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { TotalResults } from "src/sections/overview/totalResults";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";

const now = new Date();

const data = [
  {
    id: "1",
    nombre: "nombre 1",
    documentoIdentidad: "documentoIdentidad 1",
    tipoDocumento: "tipoDocumento 1",
    primerApellido: "primerApellido 1",
    segundoApellido: "segundoApellido 1",
    genero: "genero 1",
    sirdec: "sirdec 1",
    lugarNacimiento: {
      departamento: "departamento 1",
      municipio: "municipio 1",
    },
    lugarTomaCuerpo: {
      departamento: "departamento 1",
      municipio: "municipio 1",
    },
    muestras: [
      {
        id: "1",
        tipoMuestra: "tipo 1",
        lugarTomaMuestra: {
          departamento: "departamento 1",
          municipio: "municipio 1",
        },
        estadoMuestra: "estado 1",
        fechaTomaMuestra: "2023-04-01",
        fechaLlegadaLaboratorio: "2023-05-01",
        consentimientoPoblacional: true,
        muestradante: {
          id: "1",
          documentoIdentidad: "documentoIdentidad 1",
          nombre: "nombre 1",
          primerApellido: "primerApellido 1",
          segundoApellido: "segundoApellido 1",
          parentesco: "parentesco 1",
          fechaNacimiento: "1987-11-21",
          lugarNacimiento: {
            departamento: "departamento 1",
            municipio: "municipio 1",
          },
          direccion: "direccion 1",
          tipoDocumento: "tipoDocumento 1",
        },
        anexo: {
          ot: "ot 1",
          perito: "perito 1",
          observaciones: "observaciones 1",
          uriDocumentacion: "enlace",
        },
      },
    ],
  },
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
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

  return (
    <>
      <Head>
        <title>Registro de muestradantes CTI | Búsqueda</title>
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
                <Typography variant="h4">Registro de muestradantes</Typography>
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
            <DonorsSearch />
            <DonorsTable
              count={data.length}
              items={customers}
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

            <Grid container spacing={3}>
              <Grid xs={12} sm={6} lg={3}>
                <OverviewBudget difference={12} positive sx={{ height: "100%" }} value="$24k" />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <TotalResults
                  difference={16}
                  positive={false}
                  sx={{ height: "100%" }}
                  value="1.6k"
                />
              </Grid>

              <Grid xs={12} sm={6} lg={3}>
                <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
              </Grid>
            </Grid>
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
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
