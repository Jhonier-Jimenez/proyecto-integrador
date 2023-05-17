import PropTypes from "prop-types";
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const DonorsSamplesTable = (props) => {
  const { item } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
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
              {item && (
                <TableRow hover key={item.id}>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Typography variant="subtitle2">{item.id}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{item.muestradanteId}</TableCell>
                  <TableCell>Pendiente:AGREGAR DOCUMENTO Muestradante</TableCell>
                  <TableCell>Pendiente:AGREGAR NOMBRE Muestradante</TableCell>
                  <TableCell>{item.tipoMuestra}</TableCell>
                  <TableCell>{item.estadoMuestra}</TableCell>
                  <TableCell>{item.radicadoInterno}</TableCell>
                  <TableCell>{`${item.consentimientoPoblacional}`}</TableCell>
                  <TableCell>
                    {item.lugarTomaMuestra.municipio}-{item.lugarTomaMuestra.departamento}
                  </TableCell>
                  <TableCell>
                    {item.fechaTomaMuestra.day}-{item.fechaTomaMuestra.month}-
                    {item.fechaTomaMuestra.year}
                  </TableCell>
                  <TableCell>
                    {item.fechaLlegadaLaboratorio.day}-{item.fechaLlegadaLaboratorio.month}-
                    {item.fechaLlegadaLaboratorio.year}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

DonorsSamplesTable.propTypes = {
  item: PropTypes.object,
};
