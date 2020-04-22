import { createShallow } from "@material-ui/core/test-utils";
import configureStore from "controllers/store";
import React from "react";
import { Provider } from "react-redux";
import { routes } from "routes";
import MuiNavigation from "./MuiNavigation";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

describe("<MuiNavigation />", () => {
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
        <MuiNavigation {...properties} />
      </Provider>
    );
  });
});
