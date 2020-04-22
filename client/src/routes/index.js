import aboutRoute from "./About/route";
import contentRoute from "./Content/route";
import errorRoute from "./Error/route";
import homeRoute from "./Home/route";
import notfoundRoute from "./NotFound/route";

export { default as About } from "./About";
export { default as Content } from "./Content";
export { default as Error } from "./Error";
export { default as Home } from "./Home";
export { default as NotFound } from "./NotFound";

export const routes = [
  aboutRoute,
  contentRoute,
  errorRoute,
  homeRoute,
  notfoundRoute,
]
  .sort((a, b) => a.sequence - b.sequence)
  .map((route, index) => ({
    ...route,
    index,
  }));
