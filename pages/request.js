import { Component } from 'react';
import Navbar from '../components/main-nav'
import DOMPurify from 'isomorphic-dompurify';
import {parse} from 'marked';
import convert from '../components/lang2icons'
import Image from 'next/image'
import Head from 'next/head';

export default class About extends Component {
  constructor(props){
    super(props);
    this.state = {
      body: "Thanks for considering request access on ReplDigest!  Just to let you know, not just anyone will be allowed to post things on ReplDigest.  You'll have to prove yourself worthy of writing good, detailed, and easy-to-understand tutorials first.\n\n"+
      
      "## Requirements\nYou qualify for this position if:\n - You have been coding for at least two years and are proficient in at least two programming languages\n - You are fluent in English\n - You are good at explaining things to others\n - You have a past history of clean language and good tutorials\n\n"+
      
      "Please note that even if you do qualify for all the topics above, the ultimate descision is not up to you.  Please wait patiently for a response.\n\n"+
      
      "## Request Access\nSimply Make a comment on [this repl](https://replit.com/@LeviathanCoding/AccessRepl) and I'll try my best to get to you.  Please provide me with the link to a previous tutorial you have written in the past which languages you major in, and any helpful additional information."
    }
  }
  render(){
    

    return (<div>
    <Head>
      <title>Request Access | ReplDigest</title>
    </Head>
    <Navbar />
    <div id="post-container">
      <div id="post-head">
        <img alt="" src={convert["misc"]}/>
        <div id="pst-title">Request Access</div>
      </div>
      <div id="post-body" dangerouslySetInnerHTML={{__html: parse(this.state.body)}}></div>

      </div>
    </div>);
  }
}