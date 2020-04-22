import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import Root from "./Root";
import { routes } from "routes";
import { Provider } from "react-redux";
import configureStore from "controllers/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

describe("<Root />", () => {
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
        <Root {...properties}>Child</Root>
      </Provider>
    );
  });
});
