import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';

const initialState = { 
                        title:'', 
                        slug:'',
                        image: '',
                        body: '',
                        status: '',
                        message: '',
                        messageType: 'success'
                    }
class AddPostComponent extends Component {

    constructor(){
        super();
        this.state = initialState;
    }

    handleChange = event =>{
        if(event.target.name === 'title') {
            this.setState({slug: this.slugify(event.target.value)})
        }
        this.setState({ [event.target.name]:event.target.value })
    }
    handleSubmit = event =>{
        event.preventDefault();
        const url ="https://node-react-blog.herokuapp.com/posts"
        const data = {
            "title": this.state.title,
            "slug": this.state.slug,
            "image": 'https://www.westagilelabs.com/assets/portfolio/Octane_Thumb.png',
            "body": this.state.body,
            "status": true
        }
        fetch(url,{ method: 'POST',
                    body: JSON.stringify(data),
                    headers:{ 'Content-Type': 'application/json',
                    'authorization': 'bearer ' + Cookies.get('myToken')
                    } 
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

     slugify = (string) =>{
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
      
        return string.toString().toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, '') // Trim - from end of text
      }

    render(){
        return(
            <div className="wrapper fadeInDown">
                <div id="formContent">
                <div className="fadeIn first">
                    <h2 className="title">Add Post</h2>
                    <h6 className={ this.state.messageType }> { this.state.message }</h6>
                </div>
                <form onSubmit= { this.handleSubmit}>
                    <input
                    type="text"
                    id="title"
                    className="fadeIn second"
                    name="title"
                    placeholder="Post Title*"
                    value={this.state.title}
                    required
                    onChange = { this.handleChange }
                    />
                    <input
                    type="text"
                    id="slug"
                    className="fadeIn third"
                    name="slug"
                    placeholder="Slug"
                    value={this.state.slug}
                    onChange = { this.handleChange }
                    readOnly
                    />
                    <textarea
                    id="body"
                    className="fadeIn third"
                    name="body"
                    placeholder="Body"
                    value={this.state.body}
                    required
                    onChange = { this.handleChange }
                    >
                        
                        </textarea>
                    <input type="submit" className="fadeIn fourth" value="Publish" />
                </form>
                </div>
            </div>
        );
    }
}

export default withRouter(AddPostComponent);


