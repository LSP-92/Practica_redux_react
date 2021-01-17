import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { mapStateToPropsAuth } from "../../store/connectStore";
import { connect } from "react-redux";

const PrivateRoute = (props) => {
  const { auth: isLogged } = props.auth; // props.state;
  const location = useLocation();
  return isLogged ? ( //isLogged
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: location } }} />
  );
};

export default connect(mapStateToPropsAuth)(PrivateRoute);
