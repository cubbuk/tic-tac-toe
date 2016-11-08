import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/app/app";
import TicTacToe from "./components/tic_tac_toe/tic_tac_toe";

export default (
  <Route path="/" component={App}>
    <IndexRoute components={TicTacToe}/>
  </Route>
);
