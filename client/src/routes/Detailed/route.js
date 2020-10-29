import { DonutLarge as DonutLargeIcon } from "@material-ui/icons";
import Root from "./Root";

const route = {
  sequence: 10,
  name: "Detailed",
  label: "Detailed View",
  path: "/detailed",
  exact: true,
  component: Root,
  icon: DonutLargeIcon,
  user: true,
  admin: false,
  indent: false,
  hidden: false,
};

export default route;
