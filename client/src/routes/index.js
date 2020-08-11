import aboutRoute from "./About/route";
import dashboardRoute from "./Dashboard/route";
import detailedRoute from "./Detailed/route";
import errorRoute from "./Error/route";
import homeRoute from "./Home/route";
import notfoundRoute from "./NotFound/route";
import visualizationRoute from "./Visualization/route";

export { default as About } from "./About";
export { default as Dashboard } from "./Dashboard";
export { default as Detailed } from "./Detailed";
export { default as Error } from "./Error";
export { default as Home } from "./Home";
export { default as NotFound } from "./NotFound";
export { default as Visualization } from "./Visualization";

export const routes = [
  aboutRoute,
  dashboardRoute,
  detailedRoute,
  visualizationRoute,
  errorRoute,
  homeRoute,
  notfoundRoute,
]
  .sort((a, b) => a.sequence - b.sequence)
  .map((route, index) => ({
    ...route,
    index,
  }));
