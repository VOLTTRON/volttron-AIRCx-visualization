import { createShallow } from "@material-ui/core/test-utils";
import React from "react";
import MuiInfo from "./MuiInfo";

describe("<MuiInfo />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {};
    shallow(<MuiInfo {...properties} />);
  });
});
