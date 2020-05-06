import { Info as InfoIcon } from "@material-ui/icons";
import Root from "./Root";

const route = {
  sequence: 90,
  name: "About",
  label: "About",
  path: "/about",
  exact: true,
  component: Root,
  icon: InfoIcon,
  user: false,
  admin: false,
  indent: true,
  hidden: false,
};

export default route;
