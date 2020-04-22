import { Description as DescriptionIcon } from "@material-ui/icons";
import Root from "./Root";

const route = {
  sequence: 50,
  name: "Content",
  label: "Content",
  short: "Content",
  path: "/content",
  exact: true,
  component: Root,
  icon: DescriptionIcon,
  user: true,
  indent: true,
  hidden: false,
};

export default route;
