import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
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
import { DonorsTable } from "src/sections/donors-search/donors-table";
import { DonorsSearch } from "src/sections/donors-search/donors-search";
import { applyPagination } from "src/utils/apply-pagination";
import { TotalResults } from "src/sections/overview/totalResults";

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

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearchByName = async (searchData) => {
    const url = "http://localhost:80/api/Muestradante/filter";

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

  const handleSearchByDocument = async (documentoDeIdentidad) => {
    const url = `http://localhost:80/api/Muestradante/identificacion/${documentoDeIdentidad}`;

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
              <Typography variant="h4">Búsqueda de muestradantes</Typography>
            </Stack>

            <DonorsSearch
              handleSearchByName={handleSearchByName}
              handleSearchByDocument={handleSearchByDocument}
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
              <DonorsTable
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
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
