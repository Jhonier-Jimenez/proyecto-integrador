import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";

export const SamplesInfo = ({ documentoIdentidad, nombres }) => (
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
          Datos del muestradante
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Nombres: {nombres}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Documento de Identidad: {documentoIdentidad}
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
