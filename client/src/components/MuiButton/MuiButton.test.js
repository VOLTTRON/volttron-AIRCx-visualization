import { createShallow } from "@material-ui/core/test-utils";
import React from "react";
import MuiButton from "./MuiButton";

describe("<MuiButton />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {};
    shallow(<MuiButton {...properties} />);
  });
});
