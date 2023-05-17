import PropTypes from "prop-types";
import {
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const MissingsSamplesTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>#</TableCell>
                <TableCell>Muestra ID</TableCell>
                <TableCell>Muestradante ID</TableCell>
                <TableCell>Documento Muestradante</TableCell>
                <TableCell>Nombre Muestradante</TableCell>
                <TableCell>Tipo de muestra</TableCell>
                <TableCell>Estado de la muestra</TableCell>
                <TableCell>Radicado Interno</TableCell>
                <TableCell>Consentimiento Poblacional</TableCell>
                <TableCell>Lugar toma de muestra</TableCell>
                <TableCell>Fecha toma de muestra (Día/Mes/Año)</TableCell>
                <TableCell>Fecha de llegada al laboratorio (Día/Mes/Año)</TableCell>
                <TableCell>Anexo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((resultado, index) => {
                const isSelected = selected.includes(resultado.id);

                return (
                  <TableRow hover key={resultado.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(resultado.id);
                          } else {
                            onDeselectOne?.(resultado.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{index}</TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{resultado.muestraId}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{resultado.muestra.muestradanteId}</TableCell>
                    <TableCell>Pendiente:AGREGAR DOCUMENTO Muestradante</TableCell>
                    <TableCell>Pendiente:AGREGAR NOMBRE Muestradante</TableCell>
                    <TableCell>{resultado.muestra.tipoMuestra}</TableCell>
                    <TableCell>{resultado.muestra.estadoMuestra}</TableCell>
                    <TableCell>{resultado.muestra.radicadoInterno}</TableCell>
                    <TableCell>{`${resultado.muestra.consentimientoPoblacional}`}</TableCell>
                    <TableCell>
                      {resultado.muestra.lugarTomaMuestra.municipio}-
                      {resultado.muestra.lugarTomaMuestra.departamento}
                    </TableCell>
                    <TableCell>
                      {resultado.muestra.fechaTomaMuestra.day}-
                      {resultado.muestra.fechaTomaMuestra.month}-
                      {resultado.muestra.fechaTomaMuestra.year}
                    </TableCell>
                    <TableCell>
                      {resultado.muestra.fechaLlegadaLaboratorio.day}-
                      {resultado.muestra.fechaLlegadaLaboratorio.month}-
                      {resultado.muestra.fechaLlegadaLaboratorio.year}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MissingsSamplesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
