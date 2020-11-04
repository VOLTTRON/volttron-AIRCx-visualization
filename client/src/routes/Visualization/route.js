import { InsertChartOutlined as InsertChartOutlinedIcon } from "@material-ui/icons";
import Root from "./Root";
import { parseBoolean } from "utils/utils";

const route = {
  sequence: 15,
  name: "Visualization",
  label: "Visualization View",
  path: "/visualization",
  exact: true,
  component: Root,
  icon: InsertChartOutlinedIcon,
  user: parseBoolean(process.env.REACT_APP_LOGIN),
  admin: false,
  indent: false,
  hidden: false,
};

export default route;
