// @mui/icons-material
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTree";
import BuildIcon from "@mui/icons-material/Build";
import Dashboard from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import Settings from "@mui/icons-material/Settings";
import { IoRocketSharp } from "react-icons/io5";

export const ProjectRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: Dashboard,
  },
  {
    path: "/hub",
    name: "Hub",
    icon: AccountTreeRoundedIcon,
  },
  {
    path: "/configurations",
    name: "Configurations",
    icon: BuildIcon,
  },
  {
    path: "/deployments",
    name: "Deployments",
    icon: IoRocketSharp,
  },
  {
    path: "/recent",
    name: "Recent",
    icon: HistoryOutlinedIcon,
  },
];

export const AppRoutes = [
  {
    path: "/settings",
    name: "Settings",
    icon: Settings,
  },
  {
    path: "/logout",
    name: "Logout",
    icon: ExitToAppIcon,
  },
];
