import { DashboardOutlined as DashboardIcon } from "@material-ui/icons";
import { parseBoolean } from "utils/utils";
import Root from "./Root";

const route = {
  sequence: 5,
  name: "Dashboard",
  label: "Dashboard View",
  path: "/dashboard",
  exact: true,
  component: Root,
  icon: DashboardIcon,
  user: parseBoolean(process.env.REACT_APP_LOGIN),
  admin: false,
  indent: false,
  hidden: false,
};

export default route;
