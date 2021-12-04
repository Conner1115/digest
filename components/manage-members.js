import {Component} from 'react';

export default class ManageMembers extends Component {
  constructor(props){
    super(props);
  }
  async handleSubmit(e){
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let data = await fetch("https://replqapi.leviathancoding.repl.co/add-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        pass: password
      })
    }).then(r => r.json())
    if(data.success){
      alert("Member Added");
    }else{
      alert(data.message);
    }
  }
  render(){
    return (
      <form id="manage-members" onSubmit={this.handleSubmit}>
        <input className="input" placeholder="Replit Username" name="username" autoComplete="off"/>
        <input name="password" className="input" placeholder="Confirm Password" autoComplete="off"/>
        <button type="submit" className="submit-button">Add Member</button>
      </form>
    );
  }
}