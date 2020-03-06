import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from 'js-cookie';

class ProfileComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            messageType: 'success',
            message: ''
        }
    }
    componentDidMount(){
        const url ="https://node-react-blog.herokuapp.com/users/getuser";
        fetch(url,{ method: 'GET',
                    headers:{ 
                        'Content-Type': 'application/json',
                        'authorization': 'bearer ' + Cookies.get('myToken')
                    } 
                })
        .then(res =>  res.json())
        .catch(error => {
            console.error('Error:', error)
        })
        .then(async res => {
            console.log(res);
            this.setState( {
                          _id: res._id,
                          firstName: res.firstname,
                          lastName: res.lastname,
                          email: res.email,
                          phone: res.phone,
                          password: res.password
            });
        })
    }

    handleChange = event =>{
        this.setState({ [event.target.name]:event.target.value })
    }
    handleSubmit = event =>{
        event.preventDefault();
        console.log(this.state)
        const url ="https://node-react-blog.herokuapp.com/users/"+this.state._id
        const data = {
            "firstname": this.state.firstName,
            "lastname": this.state.lastName,
            "email": this.state.email,
            "phone": this.state.phone,
            "password": this.state.password,
            "status": true
        }
        fetch(url,{ method: 'PUT',
                    body: JSON.stringify(data),
                    headers:{ 'Content-Type': 'application/json' } 
                })
        .then(res =>  res.json())
        .catch(error => {
            console.error('Error:', error)
        })
        .then(async res => {
            console.log(res);
            if(res.success){
                this.setState({messageType: 'success', message:res.message});
            } else {
                this.setState({messageType: 'error', message:res.message});
            }
            
            }
        )
    }

    render() {
    return (
      <div className="container register-form">
        <div className="form">
          <div className="note">
            <p>Profile</p>
          </div>
          <form onSubmit= {this.handleSubmit}>
          <div className="form-content">
            <div className="row row-center">
              <h6 className={ this.state.messageType }> { this.state.message }</h6>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder=" First Name *"
                    value={ this.state.firstName }
                    onChange = { this.handleChange }
                    required
                  />
                </div>
                <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email *"
                      value={ this.state.email }
                      onChange = { this.handleChange }
                      required
                    />
                  </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="password"
                    className="form-control"
                    placeholder="Current Password *"
                    value= { this.state.password }
                    onChange= { this.handleChange }
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                
              <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    value={ this.state.lastName }
                    onChange = { this.handleChange }
                  />
                </div>
               
                  <div className="form-group">
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="Phone Number"
                      value= { this.state.phone}
                      onChange = { this.handleChange }
                    />
                  </div>
               
              </div>
            </div>
            <input type="submit" className="fadeIn fourth" value="Update" />
          </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileComponent);
