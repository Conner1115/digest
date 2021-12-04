import FTPost from "./ftpost"
import {Component} from 'react'
export default class Featured extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
    this.getData = this.getData.bind(this);
  }
  async getData(){
      let data = await fetch("https://replqapi.leviathancoding.repl.co/search?q=allposts").then(r => r.json())
      this.setState({
        posts: data.filter(x => x.isFeatured)
      });
  }
  componentDidMount(){
    this.getData();
  }
  render(){
    return (<div id="featured-posts-container">
      <h3 className="header">Featured Posts</h3>
      {this.state.posts.map(post => <FTPost lang={post.lang} title={post.title} slug={post._id} key={post._id}/>)}
    </div>);
  }
}