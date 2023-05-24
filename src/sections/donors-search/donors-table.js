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
  Link,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const DonorsTable = (props) => {
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
                <TableCell>ID</TableCell>
                <TableCell>Tipo Documento</TableCell>
                <TableCell>Número Documento</TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Genero</TableCell>
                <TableCell>Lugar de Nacimiento</TableCell>
                <TableCell>Fecha de Nacimiento</TableCell>
                <TableCell>Muestra</TableCell>
                <TableCell>Desaparecidos</TableCell>
                <TableCell>Parentesco</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Teléfono</TableCell>
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
                        <Typography variant="subtitle2">{resultado.id}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{resultado.tipoDocumento}</TableCell>
                    <TableCell>{resultado.documentoIdentidad}</TableCell>
                    <TableCell>{resultado.nombre}</TableCell>
                    <TableCell>
                      {`${resultado.primerApellido} `}
                      {resultado.segundoApellido}
                    </TableCell>
                    <TableCell>PENDIENTE: AGREGAR GÉNERO</TableCell>
                    <TableCell>
                      {resultado.lugarNacimiento?.departamento}
                      {resultado.lugarNacimiento?.municipio}
                    </TableCell>
                    <TableCell>{resultado.fechaNacimiento}</TableCell>
                    <TableCell>
                      <Link
                        href={`/busqueda/muestradantes/muestra-muestradante?muestradanteID=${resultado.id}`}
                      >
                        Ver detalle
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/busqueda/muestradantes/desaparecidos-del-muestradante?muestradanteID=${resultado.id}`}
                      >
                        Ver detalles
                      </Link>
                    </TableCell>
                    <TableCell>{resultado.parentesco}</TableCell>
                    <TableCell>{resultado.direccion}</TableCell>
                    <TableCell>{resultado.telefono}</TableCell>
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

DonorsTable.propTypes = {
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
