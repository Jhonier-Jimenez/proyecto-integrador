import styles from "./link-samples-search.module.css";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Card,
  OutlinedInput,
  SvgIcon,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Stack,
} from "@mui/material";
import { useCallback, useState } from "react";
import { opcionesBusquedaVinculacion } from "src/constants/constants";
import { LinkSamplesInfo } from "./link-samples-info";

export const LinkSamplesSearch = ({
  handleSearchByName,
  handleSearchByID,
  documentoIdentidadMuestradante,
  nombreMuestradante,
}) => {
  const [searchOption, setSearchOption] = useState("documentoDeIdentidad");

  const handleSubmitName = useCallback((event) => {
    event.preventDefault();
    const searchData = formatSearchData(
      event.target.elements.nombres.value,
      event.target.elements.primerApellido.value,
      event.target.elements.segundoApellido.value
    );

    handleSearchByName(searchData);
  }, []);

  const handleSubmitID = useCallback((event) => {
    event.preventDefault();
    const desaparecidoId = event.target.elements.desaparecidoId.value;
    handleSearchByID(desaparecidoId);
  }, []);

  const formatSearchData = (nombres, primerApellido, segundoApellido) => {
    const jsonFormData = {
      nombre: nombres,
      primerApellido: primerApellido || "",
      segundoApellido: segundoApellido || "",
    };
    return jsonFormData;
  };

  const handleChangeSearchOption = (event) => {
    setSearchOption(event.target.value);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Stack>
          <Card className={styles.searchOptionsContainer}>
            <CardHeader
              subheader="Puede elegir buscar por nombre o por ID del desaparecido"
              title="Seleccione la opción de búsqueda"
            />
            <CardContent>
              <Grid container>
                <TextField
                  fullWidth
                  label="Buscar por"
                  name="criterioDeBusqueda"
                  onChange={handleChangeSearchOption}
                  select
                  SelectProps={{ native: true }}
                >
                  {opcionesBusquedaVinculacion.map((opcion) => (
                    <option key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </CardContent>
          </Card>
        </Stack>

        <LinkSamplesInfo
          documentoIdentidad={documentoIdentidadMuestradante}
          nombres={nombreMuestradante}
        />
      </Stack>
      {searchOption == "desaparecidoId" ? (
        <form autoComplete="off" onSubmit={handleSubmitID}>
          <Card>
            <CardHeader
              subheader="Por favor ingrese ID del desaparecido"
              title="Criterios de búsqueda del desaparecido"
            />

            <CardContent className={styles.inputsContainer}>
              <OutlinedInput
                fullWidth
                placeholder="ID del desaparecido"
                name="desaparecidoId"
                sx={{ maxWidth: 400, mr: 3 }}
                required
              />
            </CardContent>

            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <MagnifyingGlassIcon />
                  </SvgIcon>
                }
                variant="contained"
                className={styles.searchButton}
                type="submit"
              >
                Buscar
              </Button>
            </CardActions>
          </Card>
        </form>
      ) : (
        <form autoComplete="off" onSubmit={handleSubmitName}>
          <Card>
            <CardHeader
              subheader="Para mayor precisión, puedes llenar todos los campos; pero sólo el campo del nombre es obligatorio"
              title="Criterios de búsqueda del muestradante"
            />

            <CardContent className={styles.inputsContainer}>
              <OutlinedInput
                fullWidth
                placeholder="Nombres"
                name="nombres"
                sx={{ maxWidth: 400, mr: 3 }}
                required
              />
              <OutlinedInput
                fullWidth
                placeholder="Primer Apellido"
                name="primerApellido"
                sx={{ maxWidth: 400, mr: 3 }}
              />

              <OutlinedInput
                fullWidth
                placeholder="Segundo Apellido"
                name="segundoApellido"
                sx={{ maxWidth: 400 }}
              />
            </CardContent>

            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <MagnifyingGlassIcon />
                  </SvgIcon>
                }
                variant="contained"
                className={styles.searchButton}
                type="submit"
              >
                Buscar
              </Button>
            </CardActions>
          </Card>
        </form>
      )}
    </>
  );
};
