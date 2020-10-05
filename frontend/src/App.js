import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import AircraftComponent from "./components/AircraftComponent";
import AddAircraftComponent from "./components/AddAircraftComponent";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route path="/aircraft" exact component={AircraftComponent}></Route>
                  <Route path="/aircraft/add" exact component={AddAircraftComponent}></Route>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
