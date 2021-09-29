// @material-ui/icons
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTree';
import Assignment from "@material-ui/icons/Assignment";
import BuildIcon from '@material-ui/icons/Build';
import Dashboard from "@material-ui/icons/Dashboard";
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import { IoRocketSharp } from 'react-icons/io5';

const Routes = [
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

export default Routes;
