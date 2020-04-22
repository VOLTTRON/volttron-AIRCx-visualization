import { createShallow } from "@material-ui/core/test-utils";
import configureStore from "controllers/store";
import React from "react";
import { Provider } from "react-redux";
import MuiBusy from "./MuiBusy";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

describe("<MuiBusy />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {};
    shallow(
      <Provider store={reduxStore}>
        <MuiBusy {...properties} />
      </Provider>
    );
  });
});
