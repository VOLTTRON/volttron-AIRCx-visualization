import { createShallow } from "@material-ui/core/test-utils";
import React from "react";
import MuiStepper from "./MuiStepper";

const steps = [{ name: "Select" }, { name: "Filter" }, { name: "Review" }];

describe("<MuiStepper />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {
      steps: steps,
      step: 0
    };
    shallow(<MuiStepper {...properties} />);
  });
});
