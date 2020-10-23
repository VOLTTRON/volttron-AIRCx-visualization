import Root from "./Root";
import { Error as ErrorIcon } from "@material-ui/icons";

const route = {
  sequence: 1000,
  name: "NotFound",
  label: "Not Found",
  path: undefined,
  hidden: true,
  component: Root,
  icon: ErrorIcon
};

export default route;
