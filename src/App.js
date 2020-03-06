import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'js-cookie'
import LoginComponent from "./components/Login.component";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import ProfileComponent from "./components/Profile.component";
import RegisterComponent from "./components/Register.component";
import DashboardComponent from "./components/Dashboard.component";
import AddPostComponent from "./components/AddPost.component";
import SinglePostComponent from "./components/SinglePost.component";

const initialLogStatus = {
                      loggedin : false
                }


class App extends React.Component {
  constructor() {
      super();
      this.loginHandle = this.loginHandle.bind(this)
      this.state = initialLogStatus;
  }
  componentDidMount(){
    this.setState({loggedin: Cookies.get('myToken') ? true : false } );
  }

  loginHandle() {
      this.setState({loggedin: true})
  }
  handleLogStatus(){
    if(Cookies.get('myToken')){
      Cookies.remove('myToken');
      this.setState({loggedin: false});
      //this.props.history.push('/');
    }
  }
  
  render() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav className="navbar fixed-top navbar-expand-md custom-navbar navbar-dark">
            <img
              className="navbar-brand"
              src="http://acmsocc.github.io/2016/assets/img/googlelogo_color_324x112dp.png"
              id="logo_custom"
              width="10%"
              alt="logo"
            />
            <button
              className="navbar-toggler navbar-toggler-right custom-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon "></span>
            </button>
            <div className="collapse navbar-collapse " id="collapsibleNavbar">
              <ul className="navbar-nav ml-auto ">
              <li className={"nav-item " + (this.state.loggedin ? 'show' : 'hide')}>
                  <Link to="/add-post">
                    <b>Creat Post</b>
                  </Link>
                </li>
                <li className={"nav-item " + (this.state.loggedin ? 'show' : 'hide')}>
                  <Link to="/dashboard">
                    <b>Dashboard</b>
                  </Link>
                </li>
                <li className={"nav-item " + (this.state.loggedin ? 'show' : 'hide')}>
                  <Link to="/profile">
                    <b>Profile</b>
                  </Link>
                </li>
                <li className={"nav-item " + (this.state.loggedin ? 'hide' : 'show')}>
                  <Link to="/register">
                    <b>Register</b>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/" onClick={()=> this.handleLogStatus()}>
                    <b>{ this.state.loggedin ? 'Logout' : 'Login' }</b>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <Switch>
          <Route exact path="/" render={(props) => this.state.loggedin ? <Redirect to="/dashboard" /> : <LoginComponent func={this.loginHandle} loginStatus={ this.state.loggedin} />} />
          {/* <Route path='/' component={ () => <LoginComponent func={this.loginHandle} /> }/> */}
          <Route path="/profile"  render={(props) => this.state.loggedin ? <ProfileComponent /> : <Redirect to="/" />} />
          <Route path="/register" component={RegisterComponent} />
          <Route path="/dashboard" render={(props) => this.state.loggedin ? <DashboardComponent /> : <Redirect to="/" />} />
          <Route path="/post/:slug" render={(props) => this.state.loggedin ? <SinglePostComponent /> : <Redirect to="/" />} />
          <Route path="/add-post/" render={(props) => this.state.loggedin ? <AddPostComponent /> : <Redirect to="/" />} />
        </Switch>
      </Router>
    </div>
  );
  }
}


// const PrivateRoute = ({ component: Component, ...rest }) => withRouter(
//   <Route {...rest} render={ (props) => ( initialLogStatus.loggedin ? <Component {...props} /> : <Redirect to='/login' />)} />
// )

export default App;
