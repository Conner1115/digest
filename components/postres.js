import {Component} from 'react';
import convert from "./lang2icons";
import Image from 'next/image'

export default class PostRes extends Component {
  constructor(props){
    super(props);
  }
  changePost(post, slug){
    this.props.changePost(post, slug);
  }
  render(){
    return (
      <div className="sr" onClick={() => {
        this.changePost(this.props.text, this.props.slug)
      }}>
        <img alt="" src={convert[this.props.lang]}/>
        <div>{this.props.text}</div>
      </div>
    )
  }
}