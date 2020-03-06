import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class PostsComponent extends Component {
    constructor(props) {
      super();
    }
  
  render() {
    
    const posts = Array.from(this.props.posts);
    return ( <div className="col-lg-6 offset-lg-3">
        { posts.map((post, key) => (
              <div className="cardbox shadow-lg bg-white" key={key}>
                <div className="cardbox-heading">
                 
                  <div className="media m-0">
                    <div className="d-flex mr-3">
                      <img
                        className="img-fluid rounded-circle"
                        src="http://www.themashabrand.com/templates/bootsnipp/post/assets/img/users/4.jpg"
                        alt="User"
                      />
                    </div>
                    <div className="media-body">
                    { this.props.count === 1 ? (
                      <p className="m-0">{ post.title }</p>
                    ) : (
                        <Link to={ 'post/' + post.slug }>
                          <p className="m-0">{ post.title }</p>
                        </Link>
                    )}

                      <small>
                        <span>
                          <i className="icon ion-md-pin"></i> Nairobi, Kenya
                        </span>
                      </small>
                      <small>
                        <span>
                          <i className="icon ion-md-time"></i> { post.createdAt }
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
                <div className="cardbox-item">
                  { this.props.count === 1 ? (
                        <img
                          className="img-fluid"
                          src={ post.image }
                          alt="User Profile"
                        />
                  ) : (
                    <Link to={ 'post/' + post.slug }>
                      <img
                        className="img-fluid"
                        src={ post.image }
                        alt="User Profile"
                      />
                    </Link>
                  )
                  }
                 
                </div>
                <div className={ `body-content ${ this.props.count === 1 ? "show" : "hide"}` } >
                  <p>
                    { post.body }
                  </p>
                </div>
              </div>
     ))}
     </div>
    );
  }
}

export default withRouter(PostsComponent);
