import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


import NavigationBar from "../Controllers/common/navbar.js";
import Home from "../Controllers/homepage/Home.js";
import Users from "../Controllers/users/users.js";
import Transactions from "../Controllers/users/transactions.js";
import Courses from "../Controllers/courses/courses.js";
import Services from "../Controllers/services/services.js";
import "../Controllers/common/cards.css";
import Profile from "../Controllers/users/Profile.js";
import Login from "../Controllers/login/Login.js";
import CourseView from "../Controllers/courses/CourseView.js"

function checkTokenAuth(){
	const token = localStorage.getItem('sessionToken');
	if (!token){
		return false;
	}
	return true;
}

function App() {
	if(!checkTokenAuth()){
		//history.push('/');
		return (
			<Router>
				<Login/>
			</Router>
		)
	}
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
				<Route path = "/users/profile" component={Profile}/>
				<Route exact path="/services" component={Services}/>
				<Route exact path="/courses" component={Courses}/>
				<Route path = "/courses/view" component={CourseView}/>
			</Switch>
		</div>
		</Router>
	);
}

export default App;
