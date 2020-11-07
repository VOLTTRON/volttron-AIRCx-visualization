import { DonutLarge as DonutLargeIcon } from "@material-ui/icons";
import Root from "./Root";
import { parseBoolean } from "utils/utils";

const route = {
  sequence: 10,
  name: "Detailed",
  label: "Detailed View",
  path: "/detailed",
  exact: true,
  component: Root,
  icon: DonutLargeIcon,
  user: parseBoolean(process.env.REACT_APP_LOGIN),
  admin: false,
  indent: false,
  hidden: false,
};

export default route;
