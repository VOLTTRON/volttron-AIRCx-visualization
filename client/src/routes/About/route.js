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
  admin: false,
  indent: true,
  hidden: true
};

export default route;
