import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import PostsComponent from "./Posts.component";

class SinglePostComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      posts: ""
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.slug);
    const url = "https://node-react-blog.herokuapp.com/posts/"+this.props.match.params.slug;
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
          console.log(res)
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
            <PostsComponent posts={this.state.posts} count={1}/>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(SinglePostComponent);
