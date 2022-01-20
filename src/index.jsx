import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import {persistStore, persistReducer} from "redux-persist";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from "redux-persist/lib/storage";
import { Provider } from "react-redux";
import { devToolsEnhancer } from 'redux-devtools-extension';

import rootReducer from "./reducers/reducers";

import MainView from "./components/main-view/main-view";

import Container from "react-bootstrap/Container";
import "./index.scss";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const myFlixStore = createStore(persistedReducer, devToolsEnhancer());
const persistor = persistStore(myFlixStore);


class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store = {myFlixStore}>
        <Container fluid>
          <PersistGate persistor={persistor} >
            <MainView />
          </PersistGate>
        </Container>
      </Provider>
    );
  }
}

//Finds the root of the app
const container = document.getElementsByClassName("app-container")[0];

//Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
