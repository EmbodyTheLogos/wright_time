import React from 'react';
import './App.css';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import AircraftComponent from "./components/AircraftComponent";
import AddAircraftComponent from "./components/AddAircraftComponent";
import UserComponent from "./components/UserComponent";
import AddUserComponent from "./components/AddUserComponent";
import HomeComponent from "./components/HomeComponent";
import SessionComponent from "./components/SessionComponent";
import AddSessionComponent from "./components/AddSessionComponent";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route path={"/"} exact component={HomeComponent}/>

                  <Route path={"/aircraft"} exact component={AircraftComponent}/>
                  <Route path={"/aircraft/add"} exact component={AddAircraftComponent}/>
                  <Route path={"/aircraft/edit/:id"} exact component={AddAircraftComponent}/>

                  <Route path={"/users"} exact component={UserComponent}/>
                  <Route path={"/users/add"} exact component={AddUserComponent}/>
                  <Route path={"/users/edit/:id"} exact component={AddUserComponent}/>

                  <Route path={"/sessions"} exact component={SessionComponent}/>
                  <Route path={"/sessions/add"} exact component={AddSessionComponent}/>
                  <Route path={"/sessions/edit/:id"} exact component={AddSessionComponent}/>

              </Switch>
          </BrowserRouter>
      </div>
  );
}

//<Route path="/aircraft/add" exact component={AddAircraftComponent}></Route>
export default App;
