import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import PostsComponent from "./Posts.component";

class DashboardComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      posts: ""
    };
  }
  componentDidMount() {
    const url = "http://localhost:3001/posts/";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "bearer " + Cookies.get("myToken")
      }
    })
      .then(res => res.json())
      .catch(error => {
        console.error("Error:", error);
      })
      .then(async res => {
        this.setState({
          posts: res
        });
      });
  }

  render() {
    return (
      <section className="hero">
        <div className="container">
          <div className="row">
            <PostsComponent posts={this.state.posts} />
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(DashboardComponent);
