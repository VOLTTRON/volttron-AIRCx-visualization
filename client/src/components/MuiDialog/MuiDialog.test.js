import { Typography } from "@material-ui/core";
import { createShallow } from "@material-ui/core/test-utils";
import React from "react";
import MuiDialog from "./MuiDialog";

describe("<MuiDialog />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {
      title: "Empty Dialog",
      content: <div>Content</div>
    };
    shallow(
      <MuiDialog {...properties}>
        <Typography>Child</Typography>
      </MuiDialog>
    );
  });
});
