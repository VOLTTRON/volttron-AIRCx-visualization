import { createShallow } from "@material-ui/core/test-utils";
import React from "react";
import { routes } from "routes";
import MuiLink from "./MuiLink";

describe("<MuiLink />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {
      page: routes[0]
    };
    shallow(<MuiLink {...properties} />);
  });
});
