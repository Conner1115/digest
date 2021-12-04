import {Component} from 'react';
import allTags from './alltags'
export default class PostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      tagVal: allTags[0],
      tgs: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setTag = this.setTag.bind(this);
    this.addTag = this.addTag.bind(this);
    this.spliceTag = this.spliceTag.bind(this)
    this.getBase64 = this.getBase64.bind(this);
  }
  async handleSubmit(e){
    e.preventDefault();
    let title = e.target.title.value;
    let body = e.target.cont.value;
    let tags = this.state.tgs;
    let pass = e.target.password.value;
    let lang = e.target.language.value;
    let postData = await fetch("https://replqapi.leviathancoding.repl.co/create-post", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        tags: tags,
        pass: pass,
        language: lang
      })
    }).then(r => r.json())
    if(postData.success){
      location.href = "/post/"+postData.data._id;
    }else{
      alert(postData.message)
    }
  }
  spliceTag(){
    this.setState({
      tgs: this.state.tgs.splice(0,this.state.tgs.length - 1)
    })
  }
  setTag(e) {
    this.setState({
      tagVal: e.target.value
    })
  }
  addTag(){
    this.setState({
      tgs: this.state.tgs.length < 5 ? [...new Set([...this.state.tgs, this.state.tagVal])] : [...this.state.tgs]
    });
  }
  getBase64(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
        self.setState({
          image: upload.target.result
        },
        async function(){
          let bs4 = self.state.image;
          let data = await fetch("https://replqapi.leviathancoding.repl.co/upload-image", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: bs4
            })
          }).then(r => r.json())

          if(data.success){
            self.props.appendText("\n![Image Alt]("+data.image+")")
          }else{
            console.log("Error")
          }
        });
    };
    reader.readAsDataURL(file);
  }
  render() {
    return (<form method="POST" id="post-form" onSubmit={this.handleSubmit}>
      <h3 style={{textAlign: "center"}}>Write a Tutorial</h3>
      <div className="form-label">Post Title</div>
      <input className="input" type="text" name="title" placeholder="Catchy and descriptive"/>
      <div className="form-label">Post Content</div>
      <input className="submit-button" type="file" onChange={this.getBase64} accept="image/*"/>

      <textarea value={this.props.bodyCont} name="cont" rows="8" className="input" placeholder="(Markdown Supported!!)" onChange={this.props.onChange}></textarea>
      <div className="form-label">Tags</div>
      <input style={{display: "initial", width: "calc(100% - 60px)"}} className="input" readOnly={true} value={this.state.tgs.join(', ')} placeholder="(up to five)"/>
      <button type="button" className="submit-button" onClick={this.spliceTag} style={{display: "initial", width: "50px", marginLeft: 10}}>X</button>
      <div id="tag-flex">
        <select name="tag-sel" id="tag-sel" className="sel" value={this.state.tagval} onChange={this.setTag}>
          {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>
        <button type="button" className="submit-button" onClick={this.addTag}>Add Tag</button>
      </div>
      <div className="form-label">Select Language/Topic</div>
      <select name="language" className="sel">{allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}</select>
      <input className="input" type="text" name="password" placeholder="Confirm Password" autoComplete="off"/>
      <input type="submit" className="submit-button" value="Post Tutorial"/>
    </form>)
  }
}

