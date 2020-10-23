import Root from "./Root";
import { Error as ErrorIcon } from "@material-ui/icons";

const route = {
  sequence: 100,
  name: "Error",
  label: "Error",
  path: "/error",
  hidden: true,
  component: Root,
  icon: ErrorIcon
};

export default route;
