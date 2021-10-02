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

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <br />
        <br />
        <br />
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
