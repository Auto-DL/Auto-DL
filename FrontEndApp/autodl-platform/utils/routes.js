// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Assignment from "@material-ui/icons/Assignment";
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import { IoRocketSharp } from 'react-icons/io5';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTree';

const ProjectRoutes = [
  {
    path: "/project/",
    name: "Dashboard",
    icon: Dashboard
  },
  {
    path: "/project/hub",
    name: "Hub",
    icon: AccountTreeRoundedIcon
  },
  {
    path: "/project/deployments",
    name: "Deployments",
    icon: IoRocketSharp,
  },
  {
    path: "/project/",
    name: "Recent",
    icon: HistoryOutlinedIcon,
  },
];

export default ProjectRoutes;
