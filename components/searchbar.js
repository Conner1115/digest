import React from 'react';
import Results from './search-results'
import Image from 'next/image'
export default class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: "",
      focus: false
    }
    this.update = this.update.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
  }
  async getJSON(endpoint) {
    return await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(r => r.json())
  }
  focus (){
    this.setState({
      focus: true
    })
  }
  blur(){
    setTimeout(function(){
      this.setState({
        focus: false
      })
    }.bind(this), 250)
  }
  async update (e) {
    this.setState({
      value: e.target.value,
      autocomplete: await this.getJSON("https://replqapi.leviathancoding.repl.co/autocomplete?q="+e.target.value + "&tags="+JSON.stringify(this.props.tags))
    })
  }
  render(){
    return (<div id="search-bar">
      <div id="search-input-body">
        <div id="search-flex">
        <Image src="/arrow.svg" width="16" height="16" alt="svg arrow"/>
        <input type="text" autoComplete="off" onChange={this.update} value={this.state.value} id="search-input" placeholder="Search" onFocus={this.focus} onBlur={this.blur}/>
        </div>
        <Results autocomplete={this.state.autocomplete} focus={this.state.focus}/>
        
      </div>
    </div>);
  }
}