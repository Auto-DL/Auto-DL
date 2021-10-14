// @material-ui/icons
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTree';
import BuildIcon from '@material-ui/icons/Build';
import Dashboard from "@material-ui/icons/Dashboard";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import Settings from '@material-ui/icons/Settings';
import { IoRocketSharp } from 'react-icons/io5';

export const ProjectRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: Dashboard
  },
  {
    path: "/hub",
    name: "Hub",
    icon: AccountTreeRoundedIcon
  },
  {
    path: "/configurations",
    name: "Configurations",
    icon: BuildIcon
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
