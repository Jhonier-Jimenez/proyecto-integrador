import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  avatar: "/assets/avatars/avatar-neutral.png",
  city: "Medellín, ",
  country: "Antioquia",
  jobTitle: "Master user",
  name: "Victor Hidalgo",
  timezone: "GTM-5",
};

export const MissingsFormInfo = () => (
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
          {user.city} {user.country}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button fullWidth variant="text">
        Revisar
      </Button>
    </CardActions>
  </Card>
);
