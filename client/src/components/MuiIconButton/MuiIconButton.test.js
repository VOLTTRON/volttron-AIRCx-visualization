import { createShallow } from "@material-ui/core/test-utils";
import React from "react";
import MuiIconButton from "./MuiIconButton";

describe("<MuiIconButton />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {};
    shallow(<MuiIconButton {...properties} />);
  });
});
