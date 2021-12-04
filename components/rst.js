import {Component} from 'react';
import PostRes from './postres'

export default class RST extends Component {
  constructor(props){
    super(props);
    this.changePost = this.changePost.bind(this);
  }
  changePost(post, slug){
    this.props.changePost(post, slug)
  }
  render(){
    return (
      <div id="changepost-results">
        {this.props.autocomplete.length === 0 && <em id="nores">No Results</em>}
        {this.props.autocomplete.map(x => <PostRes lang={x.lang} text={x.title} slug={x.slug} key={x.slug} changePost={this.changePost}/>)}
      </div>
    )
  }
}