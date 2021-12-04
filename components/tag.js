import React from 'react'
import convert from './lang2icons'
import Image from 'next/image'
export default class Tag extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: props.active
    }
  }
  toggleState() {
    this.setState({
      active: !this.state.active
    })
    
  }
  render(){
    return (<div className={"code-tag" + (this.state.active ? " tag-active" : "")} onClick={() => {
      this.toggleState()
      if(!this.state.active){
        this.props.addTag(this.props.name);
      }else{
        this.props.removeTag(this.props.name);
      }
    }}>
      <img alt="" src={convert[this.props.name]}/> <div style={{marginLeft: 10}}>#{this.props.name}</div>
    </div>);
  }
}