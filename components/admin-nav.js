import {Component} from 'react';
import Image from 'next/image'
export default class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {}
    }
  }
  componentDidMount(){
    fetch("https://replqapi.leviathancoding.repl.co/repluser/"+this.props.username+"/icon").then(r => r.json()).then(data => {
      this.setState({
        data: data
      })
    })
  }
  render() {
      let data = this.state.data;
      return (<div id="admin-nav">
        <a href={"https://replit.com/@" + this.props.username} ><Image alt="" width={50} height={50} src={data.url} id="admin-user-avatar"/></a>
        <a href={"https://replit.com/@" + this.props.username} ><div id="admin-user-name">{this.props.username}</div></a>
        <div className="nav-tab" onClick={() => {
          this.props.changeTab(0)
        }}>Write Post</div>
        {this.props.headAdmin && 
        <div className="nav-tab" onClick={() => {
          this.props.changeTab(1)
        }}>Manage Posts</div>}
        {this.props.headAdmin &&
        <div className="nav-tab" onClick={() => {
          this.props.changeTab(2)
        }}>Members</div>}
      </div>);
      
  }
}