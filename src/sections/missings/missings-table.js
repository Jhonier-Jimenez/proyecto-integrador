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

export const MissingsTable = (props) => {
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
                <TableCell>Tipo Documento</TableCell>
                <TableCell>Número Documento</TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Genero</TableCell>
                <TableCell>Sirdec</TableCell>
                <TableCell>Lugar de Nacimiento</TableCell>
                <TableCell>Lugar toma de cuerpo</TableCell>
                <TableCell>Muestras</TableCell>
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

                    <TableCell>{resultado.tipoDocumento}</TableCell>
                    <TableCell>{resultado.documentoIdentidad}</TableCell>
                    <TableCell>{resultado.nombre}</TableCell>
                    <TableCell>
                      {`${resultado.primerApellido} `}
                      {resultado.segundoApellido}
                    </TableCell>
                    <TableCell>{resultado.genero}</TableCell>
                    <TableCell>{resultado.sirdec}</TableCell>

                    <TableCell>
                      {resultado.lugarNacimiento?.departamento}
                      {resultado.lugarNacimiento?.municipio}
                    </TableCell>
                    <TableCell>
                      {resultado.lugarTomaCuerpo?.departamento}
                      {resultado.lugarTomaCuerpo?.municipio}
                    </TableCell>

                    <TableCell>
                      <Link
                        href={`/busqueda/desaparecidos/muestras-desaparecido?desaparecidoID=${resultado.id}`}
                      >
                        Ver muestras
                      </Link>
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

MissingsTable.propTypes = {
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
