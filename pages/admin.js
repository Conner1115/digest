import {Component} from 'react';
import Image from 'next/image';
import Admin from '../components/admin'
import Router from 'next/router'

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      password: "",
      error: ""
    }
    this.authorize = this.authorize.bind(this);
    this.update = this.update.bind(this);
  }
  update(e){
    this.setState({
      password: e.target.value
    })
  }
  async authorize(){
    let authorized = await this.postJSON("https://replqapi.leviathancoding.repl.co/login", {
      password: this.state.password
    })
    if(authorized.success){
      this.setState({
        error: ""
      })
      window.addEventListener('message', authComplete);

      var h = 500;
      var w = 350;
      var left = (screen.width / 2) - ( w / 2);
      var top = (screen.height / 2) - (h / 2);

      var authWindow = window.open(
        'https://repl.it/auth_with_repl_site?domain='+location.host,
        '_blank',
        'modal =yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left)

      function authComplete(e) {
        if (e.data !== 'auth_complete') {
          return;
        }
        window.removeEventListener('message', authComplete);
        authWindow.close();
        Router.push('/admin?', null)
      }
    }else{
      this.setState({
        error: authorized.message
      })
    }
  }
  async postJSON(url, body, stringify = true) {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      body: stringify ? JSON.stringify(body) : body,
      method: "POST"
    });
    return res.json();
  }
  render(){
    if(this.props.username){
      return <Admin {...this.props}/>;
    }else{
      return (
        <div id="container">
          <div id="login-container">
            <h1>Log In</h1>
            <p>Please log into the administration dashboard.  Only select users may enter.</p>
            <div id="login-input-body">
              <div id="login-flex">
                <Image src="/arrow.svg" width="16" height="16" alt="svg arrow"/>
                <input type="text" autoComplete="off" onChange={this.update} value={this.state.password} id="login-input" placeholder="Password"/>
              </div>
            </div>
            <button id="login-button" onClick={this.authorize}>Log In with Replit</button>
            <div id="login-error">{this.state.error||this.props.error||""}</div>
          </div>
        </div>
      );
    }
  }
}

export async function getServerSideProps(ctx){
  const req = ctx.req;
  const res = ctx.res;
  if(req.headers['x-replit-user-name']){
    let data = await fetch("https://replqapi.leviathancoding.repl.co/isauth", {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: req.headers['x-replit-user-name'],
          replitid: req.headers["x-replit-user-id"],
        }),
        method: "POST"
      }).then(r => r.json());
    
    if(data.success){
      return {
        props: {
          username: req.headers['x-replit-user-name'],
          userid: req.headers["x-replit-user-id"],
          headAdmin: data.headAdmin
        }
      }
    }else{
      return {
        props: {
          error: data.message
        }
      }
    }
  }else{
    return {
      props: {}
    }
  }
}