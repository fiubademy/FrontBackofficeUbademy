import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


import NavigationBar from "../Controllers/common/navbar.js";
import Home from "../Controllers/homepage/Home.js";
import Users from "../Controllers/users/users.js";
import Transactions from "../Controllers/users/transactions.js";
import Courses from "../Controllers/courses/courses.js";
import Services from "../Controllers/services/services.js";

function App() {
  return (
    <Router>
      <div>
        <br></br>
        <br></br>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/users" component={Users}/>
          <Route exact path="/users/transactions" component={Transactions}/>
          <Route exact path="/services" component={Services}/>
          <Route exact path="/courses" component={Courses}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
