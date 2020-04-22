import { createShallow } from "@material-ui/core/test-utils";
import React from "react";
import MuiTheme from "./MuiTheme";

describe("<MuiTheme />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {
      page: 0
    };
    shallow(<MuiTheme {...properties}>Sample Text</MuiTheme>);
  });
});
