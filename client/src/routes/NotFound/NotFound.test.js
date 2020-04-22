import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import NotFound from "./NotFound";
import { Provider } from "react-redux";
import configureStore from "controllers/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

describe("<NotFound />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with no properties specified.", () => {
    const properties = {};
    shallow(
      <Provider store={reduxStore}>
        <NotFound {...properties} />
      </Provider>
    );
  });
});
