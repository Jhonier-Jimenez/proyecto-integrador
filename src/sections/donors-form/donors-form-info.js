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
          No existen requisitos previos para agregar un nuevo desaparecido
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
