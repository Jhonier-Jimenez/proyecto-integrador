import styles from "./missings-search.module.css";
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
} from "@mui/material";
import { useCallback } from "react";

export const MissingsSearch = ({ onInputChange, onSearch }) => {
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const searchData = formatSearchData(
      event.target.elements.nombres.value,
      event.target.elements.primerApellido.value,
      event.target.elements.segundoApellido.value
    );

    onSearch(searchData);
  }, []);

  const formatSearchData = (nombres, primerApellido, segundoApellido) => {
    const jsonFormData = {
      nombre: nombres,
      primerApellido: primerApellido || "",
      segundoApellido: segundoApellido || "",
    };
    return jsonFormData;
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Para mayor precisión, puedes llenar todos los campos; pero sólo el campo del nombre es obligatorio"
          title="Datos del desaparecido"
        />

        <CardContent className={styles.inputsContainer}>
          <OutlinedInput
            fullWidth
            placeholder="Nombres"
            name="nombres"
            onKeyDown={handleKeyDown}
            sx={{ maxWidth: 400, mr: 3 }}
            required
          />
          <OutlinedInput
            fullWidth
            placeholder="Primer Apellido"
            name="primerApellido"
            onKeyDown={handleKeyDown}
            sx={{ maxWidth: 400, mr: 3 }}
          />

          <OutlinedInput
            fullWidth
            placeholder="Segundo Apellido"
            name="segundoApellido"
            onKeyDown={handleKeyDown}
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
  );
};
