import {Component} from 'react';
import Nav from './admin-nav';
import PostForm from './post-form';
import MarkdownOutput from './markdown-output';
import ManagePosts from "./manage-posts";
import ManageMembers from "./manage-members";

export default class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: "",
      tabSelected: 0
    }
    this.updateBody = this.updateBody.bind(this);
    this.appendText = this.appendText.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }
  updateBody(e){
    this.setState({
      content: e.target.value
    })
  }
  appendText(text){
    this.setState({
      content: this.state.content + text
    })
  }
  changeTab(tab){
    this.setState({
      tabSelected: tab
    })
  }
  render(){
    return (<div id="admin-container">
      <Nav headAdmin={this.props.headAdmin} replid={this.props.userid} username={this.props.username} changeTab={this.changeTab}/>
      {this.state.tabSelected === 0 && <div id="flex-form-create">
        <PostForm appendText={this.appendText} onChange={this.updateBody} bodyCont={this.state.content}/>
        <MarkdownOutput body={this.state.content}/>
      </div>}
      {(this.state.tabSelected === 1 && this.props.headAdmin) && <ManagePosts />}
      {(this.state.tabSelected === 2 && this.props.headAdmin) && <ManageMembers />}
    </div>)
  }
}