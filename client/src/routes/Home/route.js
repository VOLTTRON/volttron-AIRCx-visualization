import { Home as HomeIcon } from "@material-ui/icons";
import Root from "./Root";

const route = {
  sequence: 10,
  name: "Home",
  label: "Home",
  path: "/",
  exact: true,
  component: Root,
  icon: HomeIcon,
  admin: false,
  indent: true,
};

export default route;
