import {Component} from 'react';
import Image from 'next/image'
import RST from './rst'

export default class ManagePosts extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: "",
      postSelected: "",
      autocomplete: [],
      slug: "",
      password: ""
    }
    this.updatePass = this.updatePass.bind(this);
    this.update = this.update.bind(this);
    this.changePost = this.changePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }
  async getJSON(endpoint) {
    return await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(r => r.json())
  }
  async update (e) {
    this.setState({
      value: e.target.value,
      autocomplete: await this.getJSON("https://replqapi.leviathancoding.repl.co/autocomplete?q="+(e.target.value||"ˆ"))
    })
  }
  updatePass(e){
    this.setState({
      password: e.target.value
    })
  }
  changePost(post, slug){
    this.setState({
      postSelected: post,
      slug: slug
    });
  }
  async deletePost(){
    let data = await fetch("https://replqapi.leviathancoding.repl.co/delete-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pass: this.state.password,
        slug: this.state.slug
      })
    }).then(r => r.json());
    if(!data.success){
      alert(data.message)
    }else{
      this.setState({
        postSelected: "",
        slug: "",
        autocomplete: await this.getJSON("https://replqapi.leviathancoding.repl.co/autocomplete?q="+(this.state.value||"ˆ"))
      })
    }
  }
  render() {
    return (
      <div id="manage-posts">

        <div id="search-input-body">
          <div id="search-flex">
          <Image src="/arrow.svg" width="16" height="16" alt="svg arrow"/>
          <input type="text" autoComplete="off" onChange={this.update} value={this.state.value} id="search-input" placeholder="Search"/>
          </div>
        </div>

        <RST autocomplete={this.state.autocomplete} changePost={this.changePost}/>

        <input autoComplete="off" className="input" type="text" name="password" value={this.state.password} onChange={this.updatePass} placeholder="Confirm Password"/>
        <button onClick={this.deletePost} disabled={!this.state.slug} className="submit-button">Delete {this.state.postSelected && `"${this.state.postSelected}"`}</button>
      </div>
    );
  }
}

