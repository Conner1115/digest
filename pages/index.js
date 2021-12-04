import Head from 'next/head'
import Image from 'next/image'
import Tags from '../components/tags'
import SearchBar from '../components/searchbar'
import Posts from '../components/posts'
import Featured from '../components/featured'
import {Component} from 'react'
import Navbar from '../components/main-nav'

import styles from '../styles/Home.module.css'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      tagsSelected: []
    }
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }
  addTag (tag) {
    this.setState({
      tagsSelected: [...this.state.tagsSelected, tag]
    })
  }
  removeTag (tag) {
    this.setState({
      tagsSelected: this.state.tagsSelected.filter(x => x !== tag)
    })
  }
  render(){
    return (
      <div>
      <Head>
        <title>ReplDigest</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ReplDigest"/>
        <meta property="og:description"
          content="ReplDigest is a hub of anonymous tutorials written by specially appointed replers.  Not only is it a site but also an open-source API built for everyone."/>
        <meta property="og:url" content="https://digest.repl.co"/>
        <meta property="og:image" content="../public/favicon.ico"/>
        <meta property="og:image:type" content="image/*" />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta name="copyright" content="2021"/>
      </Head>
      <Navbar/>
      <div id="container">
        <Tags addTag={this.addTag} removeTag={this.removeTag}/>
        <div id="center-core">
          <SearchBar />
          <Posts key={this.state.tagsSelected} tags={this.state.tagsSelected}/>
        </div>
        <Featured />
      </div>
      </div>
    );
  }
}
