import React from "react";
//import T from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { store, authLogin } from "../../store";
import { PrivateRoute as HocPrivateRouter, LoginPage } from "../auth";
import { AdvertPage, AdvertsPage, NewAdvertPage } from "../adverts";
import NotFoundPage from "./NotFoundPage";

class App extends React.Component {
  handleLogin = (payload) => {
    store.dispatch(authLogin(payload));
  };

  render() {
    return (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <Route path="/login" exact>
          {(routerProps) => (
            <LoginPage onLogin={this.handleLogin} {...routerProps} />
          )}
        </Route>
        <HocPrivateRouter path="/adverts" exact>
          <AdvertsPage />
        </HocPrivateRouter>
        <HocPrivateRouter path="/adverts/new" exact component={NewAdvertPage} />
        <HocPrivateRouter path="/adverts/:id" exact component={AdvertPage} />
        <Route path="/404" exact>
          {NotFoundPage}
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    );
  }
}

export default App;
