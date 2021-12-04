import { Component } from 'react';
import Navbar from '../components/main-nav'
import DOMPurify from 'isomorphic-dompurify';
import {parse} from 'marked';
import convert from '../components/lang2icons'
import Image from 'next/image';
import Head from 'next/head'

export default class About extends Component {
  constructor(props){
    super(props);
    this.state = {
      body: "Welcome to ReplDigest!  You might be wondering about this in terms of why it looks so much like replit's dark theme, what exactly its purpose is, and more.  Worry not!  your questions will be answered.\n\n"+
      
      "## What is ReplDigest?\nReplDigest is a hub of anonymous tutorials written by specially appointed replers.  We make sure that not just anyone can write tutorials on our site for the sake of keeping things clean and making sure everyone gets the best experience.\n\n"+
      
      "Not only is ReplDigest a site where you can find answers to all your questions, but it is also an open-source API that you can use to provide answers to others anytime, anywhere.  Want to help us out and write some tutorials or use our API?  Feel free to [get in touch](request) and learn how to use [our API](/post/61a8fd82300f1faebf268e19).\n\n"+
      
      "ReplDigest was originally founded by LeviathanProgramming and contributed to by many others.\n\n"+
      
      "## Why the look?\nOkay, so here's why ReplDigest looks so much like replit in a way.\n\n- First off is that the palette looked nice.\n\n- Second is that I want users to feel the essence of the replers behind all these tutorials.\n\n- Third, the palette looks nice.  Whoops.\n\n"+

      "---\nLast off, enjoy ReplDigest, enjoy increasing your knowledge, and be sure to help others out.\n\n – LeviathanProgramming"
      ,
    }
  }
  render(){
    

    return (<div>
    <Head>
      <title>About | ReplDigest</title>
    </Head>
    <Navbar />
    <div id="post-container">
      <div id="post-head">
        <img alt="" src={convert["misc"]}/>
        <div id="pst-title">About ReplDigest</div>
      </div>
      <div id="post-body" dangerouslySetInnerHTML={{__html: parse(this.state.body)}}></div>
      </div>
    </div>);
  }
}