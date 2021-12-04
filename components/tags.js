import Tag from "./tag"
import React from "react";
import allTags from "./alltags"

export default class Tags extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tags: allTags,
    };
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }
  addTag(tag){
    this.props.addTag(tag)
  }
  removeTag(tag){
    this.props.removeTag(tag)
  }
  render(){
    let tags = this.state.tags.sort((a,b) => a.localeCompare(b)).map(tag => <Tag name={tag} addTag={this.addTag} removeTag={this.removeTag} key={tag}/>)
    return (<div id="tags-container">
      <h3 className="header">Tags</h3>
      <div className="describe">(Alphabetical Order)</div>
      {tags}
    </div>);
  }
}