import { Box, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";

export const LinkSamplesInfo = ({ documentoIdentidad, nombres }) => (
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
    <CardActions></CardActions>
  </Card>
);
