import "babel-polyfill";
import React from "react";
import {syncHistoryWithStore} from "react-router-redux";
import {Provider} from "react-redux";
import {render} from "react-dom";
import {Router, browserHistory} from "react-router";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./assets/main.css";
import routes from "./routes";
import configureStore from "./store/configureStore";
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);


render(
  <Provider store={store}>
    <Router routes={routes} history={history}/>
  </Provider>,
  document.getElementById("app")
);
