import { MuiTheme } from "components";
import rootSaga from "controllers/saga";
import configureStore from "controllers/store";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routes } from "./routes";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);
reduxStore.runSaga(rootSaga);

class Router extends React.Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <MuiTheme>
          <BrowserRouter>
            <Switch>
              {routes.map((route) => (
                <Route
                  key={`route-${route.name}`}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              ))}
            </Switch>
          </BrowserRouter>
        </MuiTheme>
      </Provider>
    );
  }
}

export default Router;
