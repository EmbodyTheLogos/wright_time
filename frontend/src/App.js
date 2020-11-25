import React from 'react';
import './App.css';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import AircraftComponent from "./components/Administrator/AircraftComponent";
import AddAircraftComponent from "./components/Administrator/AddAircraftComponent";
import UserComponent from "./components/Administrator/UserComponent";
import AddUserComponent from "./components/Administrator/AddUserComponent";
import AdminHomeComponent from "./components/Administrator/AdminHomeComponent";
import SessionComponent from "./components/Administrator/SessionComponent";
import AddSessionComponent from "./components/Administrator/AddSessionComponent";
import CertificationComponent from "./components/Administrator/CertificationComponent";
import AddCertificationComponent from "./components/Administrator/AddCertificationComponent";
import PendingSessionsComponent from "./components/Administrator/PendingSessionsComponent";
import HubComponent from "./components/HubComponent"
import UserHomeComponent from "./components/User/UserHomeComponent";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route path={"/"} exact component={HubComponent}/>

                  <Route path={"/admin/home"} exact component={AdminHomeComponent}/>

                  <Route path={"/admin/aircraft"} exact component={AircraftComponent}/>
                  <Route path={"/admin/aircraft/add"} exact component={AddAircraftComponent}/>
                  <Route path={"/admin/aircraft/edit/:id"} exact component={AddAircraftComponent}/>

                  <Route path={"/admin/users"} exact component={UserComponent}/>
                  <Route path={"/admin/users/add"} exact component={AddUserComponent}/>
                  <Route path={"/admin/users/edit/:id"} exact component={AddUserComponent}/>

                  <Route path={"/admin/sessions"} exact component={SessionComponent}/>
                  <Route path={"/admin/sessions/add"} exact component={AddSessionComponent}/>
                  <Route path={"/admin/sessions/edit/:id"} exact component={AddSessionComponent}/>
                  <Route path={"/admin/pending"} exact component={PendingSessionsComponent}/>

                  <Route path={"/admin/certifications"} exact component={CertificationComponent}/>
                  <Route path={"/admin/certifications/add"} exact component={AddCertificationComponent}/>
                  <Route path={"/admin/certifications/edit/:id"} exact component={AddCertificationComponent}/>

                  <Route path={"/user/home"} exact component={UserHomeComponent}/>

              </Switch>
          </BrowserRouter>
      </div>
  );
}

//<Route path="/aircraft/add" exact component={AddAircraftComponent}></Route>
export default App;
