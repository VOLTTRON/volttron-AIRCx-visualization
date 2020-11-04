import { InsertChartOutlined as InsertChartOutlinedIcon } from "@material-ui/icons";
import Root from "./Root";

const route = {
  sequence: 15,
  name: "Visualization",
  label: "Visualization View",
  path: "/visualization",
  exact: true,
  component: Root,
  icon: InsertChartOutlinedIcon,
  user: true,
  admin: false,
  indent: false,
  hidden: false,
};

export default route;
