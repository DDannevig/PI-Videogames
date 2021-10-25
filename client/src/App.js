import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import NavBar from "./components/NavBar.js";
import Home from "./components/Home.js";
import AdvancedSearch from "./components/AdvancedSearch.js";
import List from "./components/List.js";
import { BrowserRouter } from "react-router-dom";
import store from "./Redux/store.js";
import {Provider} from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
          <Route path="/" component={NavBar} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/advancedsearch" component={AdvancedSearch} />
          <Route exact path="/list" component={List} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
