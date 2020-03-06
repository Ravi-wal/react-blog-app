import React, { Component } from "react";
import Cookies from 'js-cookie';
import  { withRouter } from 'react-router-dom';


const initialState = {
    email: '',
    password: '',
    message: '',
    messageType: 'success'
}
class LoginComponent extends Component {
    constructor(props) {
        super();
        this.state = initialState;
    }
    
    // componentDidMount(){
    //     if(Cookies.get('myToken')){
    //         this.props.func(true);
    //         this.props.history.push('/dashboard')
    //     }
    // }
    handleChange = event => {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        const url = 'https://node-react-blog.herokuapp.com/auth/';
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        fetch(url, { method : 'POST',
                    body: JSON.stringify(data),
                    headers:{ 'Content-Type': 'application/json' } 
                    })
        .then( res => res.json())
        .then(res => {
            if(res.success){
                Cookies.set('myToken', res.token,{ expires: 1 });
                this.props.func(true);
                this.props.history.push('/dashboard');
            } else {
                this.setState({messageType : 'error', message: res.message})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <h2 className="title">Login</h2>
            <h6 className={ this.state.messageType }> { this.state.message }</h6>
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              id="userName"
              className="fadeIn second"
              name="email"
              placeholder="Email"
              value = { this.state.email }
              required
              onChange = { this.handleChange }
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="password"
              placeholder="Password"
              value = { this.state.password }
              required
              onChange = { this.handleChange }
            />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginComponent);
