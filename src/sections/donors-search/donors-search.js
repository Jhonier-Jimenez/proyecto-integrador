import styles from "./donors-search.module.css";
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
  Box,
} from "@mui/material";
import { useCallback, useState } from "react";
import { opcionesBusqueda } from "src/constants/constants";

export const DonorsSearch = ({ handleSearchByName, handleSearchByDocument }) => {
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

  const handleSubmitDocument = useCallback((event) => {
    event.preventDefault();
    const documentoDeIdentidad = event.target.elements.documentoDeIdentidad.value;

    handleSearchByDocument(documentoDeIdentidad);
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
      <Card className={styles.searchOptionsContainer}>
        <CardHeader
          subheader="Puede elegir buscar por documento de identidad o por nombres"
          title="Seleccione la opción de búsqueda"
        />
        <CardContent>
          <Grid container>
            <TextField
              fullWidth
              label="Tipo de Documento"
              name="tipoDocumento"
              onChange={handleChangeSearchOption}
              select
              SelectProps={{ native: true }}
            >
              {opcionesBusqueda.map((opcion) => (
                <option key={opcion.value} value={opcion.value}>
                  {opcion.label}
                </option>
              ))}
            </TextField>
          </Grid>
        </CardContent>
      </Card>
      {searchOption == "documentoDeIdentidad" ? (
        <form autoComplete="off" onSubmit={handleSubmitDocument}>
          <Card>
            <CardHeader
              subheader="Por favor ingrese el documento de identidad"
              title="Criterios de búsqueda del muestradante"
            />

            <CardContent className={styles.inputsContainer}>
              <OutlinedInput
                fullWidth
                placeholder="Documento de Identidad"
                name="documentoDeIdentidad"
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
