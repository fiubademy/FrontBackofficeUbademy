import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


import NavigationBar from "./common/navbar.js";
import Home from "./Home.js";
import Users from "./users/users.js";
import Transactions from "./users/transactions.js";
import Courses from "./courses/courses.js";
import Services from "./services/services.js";

function App() {
  return (
    <Router>
      <div>
        <br></br>
        <br></br>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/users">
            <Users/>
          </Route>
          <Route exact path="/users/transactions">
            <Transactions/>
          </Route>
          <Route exact path="/services">
            <Services/>
          </Route>
          <Route exact path="/courses">
            <Courses/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
