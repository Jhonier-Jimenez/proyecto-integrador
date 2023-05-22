import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";

export const DonorsFormInfo = () => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography gutterBottom variant="h5">
          Información importante
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Para agregar un nuevo muestradante es necesario que conozcas el nombre ó el ID del
          desaparecido al cual finalmente asociarás su muestra
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button fullWidth variant="text">
        Revisar instructivo
      </Button>
    </CardActions>
  </Card>
);
