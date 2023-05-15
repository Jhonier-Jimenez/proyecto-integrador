import { Card, CardHeader } from "@mui/material";

export const SamplesSearch = ({ desaparecidoID }) => (
  <Card sx={{ p: 2 }}>
    <CardHeader subheader={desaparecidoID} title="ID del desaparecido" />
  </Card>
);
