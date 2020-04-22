import { createShallow } from "@material-ui/core/test-utils";
import configureStore from "controllers/store";
import React from "react";
import { Provider } from "react-redux";
import { routes } from "routes";
import MuiLayout from "./MuiLayout";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

describe("<MuiLayout />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  afterAll(() => {
    shallow.cleanUp();
  });

  it("should render with properties specified.", () => {
    const properties = {
      page: routes[0]
    };
    shallow(
      <Provider store={reduxStore}>
        <MuiLayout {...properties}>Child</MuiLayout>
      </Provider>
    );
  });
});
