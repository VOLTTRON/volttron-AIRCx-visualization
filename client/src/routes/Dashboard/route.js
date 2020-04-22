import { DashboardOutlined as DashboardIcon } from "@material-ui/icons";
import Root from "./Root";

const route = {
  sequence: 5,
  name: "Dashboard",
  label: "Dashboard View",
  path: "/dashboard",
  exact: true,
  component: Root,
  icon: DashboardIcon,
  admin: false,
  indent: false,
  hidden: false,
};

export default route;
