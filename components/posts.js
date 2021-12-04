import Post from "./post.js"
import {Component} from 'react';
export default class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
    };
  }
  async getJSON(endpoint) {
    return await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(r => r.json())
  }
  async updateTags() {
    this.setState({
      posts: await this.getJSON("https://replqapi.leviathancoding.repl.co/search?q=allposts&tags="+JSON.stringify(this.props.tags)||false)
    })
  }
  async componentDidMount(){
    this.updateTags();
  }
  render() {
    return (<div id="posts-container">
      {this.state.posts.reverse().map(post => <Post lang={post.lang} title={post.title} description={post.content} tags={post.tags} slug={post._id} key={post._id}/>)}
    </div>);
  }
}



