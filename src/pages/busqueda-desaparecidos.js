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
import { MissingsTable } from "src/sections/missings/missings-table";
import { MissingsSearch } from "src/sections/missings/missings-search";
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

  const handleSearch = async (searchData) => {
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

  return (
    <>
      <Head>
        <title>Registro de desaparecidos CTI | Búsqueda</title>
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
              <Typography variant="h4">Búsqueda de desaparecidos</Typography>
            </Stack>

            <MissingsSearch onSearch={handleSearch} />
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
              <MissingsTable
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
