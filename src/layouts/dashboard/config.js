import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import MagnifyingGlassCircleIcon from "@heroicons/react/24/solid/MagnifyingGlassCircleIcon";
import { SvgIcon } from "@mui/material";

export const mainItems = [
  {
    title: "Página Principal",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Tu cuenta",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Conectarse",
    path: "/auth/login",
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Crear Cuenta",
    path: "/auth/register",
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Error",
    path: "/404",
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    ),
  },
];

export const searchitems = [
  {
    title: "Búsqueda de desaparecidos",
    path: "/busqueda-desaparecidos",
    icon: (
      <SvgIcon fontSize="small">
        <MagnifyingGlassCircleIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Búsqueda de muestradantes",
    path: "/busqueda-muestradante",
    icon: (
      <SvgIcon fontSize="small">
        <MagnifyingGlassCircleIcon />
      </SvgIcon>
    ),
  },
];

export const newRegisterItems = [
  {
    title: "Agregar desaparecido",
    path: "/agregar-desaparecido",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
];
