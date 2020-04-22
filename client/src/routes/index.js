import dashboardRoute from "./Dashboard/route";
import errorRoute from "./Error/route";
import homeRoute from "./Home/route";
import notfoundRoute from "./NotFound/route";
import visualizationRoute from "./Visualization/route";

export { default as About } from "./About";
export { default as Content } from "./Content";
export { default as Dashboard } from "./Dashboard";
export { default as Error } from "./Error";
export { default as Home } from "./Home";
export { default as NotFound } from "./NotFound";
export { default as Visualization } from "./Visualization";

export const routes = [
  dashboardRoute,
  errorRoute,
  homeRoute,
  notfoundRoute,
  visualizationRoute,
]
  .sort((a, b) => a.sequence - b.sequence)
  .map((route, index) => ({
    ...route,
    index,
  }));
