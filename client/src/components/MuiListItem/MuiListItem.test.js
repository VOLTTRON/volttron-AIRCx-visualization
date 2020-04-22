import { createShallow } from "@material-ui/core/test-utils";
import React from "react";
import MuiListItem from "./MuiListItem";

describe("<MuiListItem />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {};
    shallow(<MuiListItem {...properties} />);
  });
});
