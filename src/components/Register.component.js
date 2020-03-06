import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
const initialState = { 
                        firstName:'', 
                        lastName:'',
                        email: '',
                        phone: '',
                        password: '',
                        message: '',
                        messageType: 'success'
                    }
class RegisterComponent extends Component {

    constructor(){
        super();
        this.state = initialState;
    }

    handleChange = event =>{
        this.setState({ [event.target.name]:event.target.value })
        //console.log(this.state);
    }
    handleSubmit = event =>{
        event.preventDefault();
        console.log(this.state)
        const url ="http://localhost:3001/users"
        const data = {
            "firstname": this.state.firstName,
            "lastname": this.state.lastName,
            "email": this.state.email,
            "phone": this.state.phone,
            "password": this.state.password,
            "status": true
        }
        fetch(url,{ method: 'POST',
                    body: JSON.stringify(data),
                    headers:{ 'Content-Type': 'application/json' } 
                })
        .then(res =>  res.json())
        .catch(error => {
            console.error('Error:', error)
        })
        .then(async res => {
            console.log(res);
            if(res.status){
                await this.setState(initialState);
                console.log(this.state);
                this.setState({messageType: 'success', message:res.message});
            } else {
                this.setState({messageType: 'error', message:res.message});
            }
            
            }
        )
    }

    render(){
        return(
            <div className="wrapper fadeInDown">
                <div id="formContent">
                <div className="fadeIn first">
                    <h2 className="title">Register</h2>
                    <h6 className={ this.state.messageType }> { this.state.message }</h6>
                </div>
                <form onSubmit= { this.handleSubmit}>
                    <input
                    type="text"
                    id="firstName"
                    className="fadeIn second"
                    name="firstName"
                    placeholder="First Name*"
                    value={this.state.firstName}
                    required
                    onChange = { this.handleChange }
                    />
                    <input
                    type="text"
                    id="lastName"
                    className="fadeIn third"
                    name="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange = { this.handleChange }
                    />
                    <input
                    type="email"
                    id="email"
                    className="fadeIn third"
                    name="email"
                    placeholder="Email*"
                    value={this.state.email}
                    required
                    onChange = { this.handleChange }
                    />
                    <input
                    type="text"
                    id="phone"
                    className="fadeIn third"
                    name="phone"
                    placeholder="Phone"
                    value={this.state.phone}
                    required
                    onChange = { this.handleChange }
                    />
                    <input
                    type="password"
                    id="password"
                    className="fadeIn third"
                    name="password"
                    placeholder="Password*"
                    value={this.state.password}
                    required
                    onChange = { this.handleChange }
                    />
                    <input type="submit" className="fadeIn fourth" value="Register" />
                </form>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterComponent);


