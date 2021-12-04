import url from 'url'
import { Component } from 'react';
import Navbar from '../../components/main-nav'
import DOMPurify from 'isomorphic-dompurify';
import {parse} from 'marked';
import convert from '../../components/lang2icons'
import Head from 'next/head'
import Image from 'next/image'
export default function Post(props) {
  return <Pst {...props} />
}
class Pst extends Component {
  constructor(props){
    super(props);
    this.state = {
      body: "",
      slug: "",
      data: {}
    }
  }
  render(){
    let data = this.props.data

    return (<div>
    <Head>
        <title>{data.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ReplDigest"/>
        <meta property="og:description"
          content={data.content}/>
        <meta property="og:url" content="https://digest.repl.co"/>
        <meta property="og:image" content="../public/favicon.ico"/>
        <meta property="og:image:type" content="image/*" />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta name="copyright" content="2021"/>
      </Head>
    <Navbar />
    <div id="post-container">
      <div id="post-head">
        <img alt="" src={convert[data.lang]}/>
        <div id="pst-title">{data.title}</div>
      </div>
      <div id="post-body" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(parse(data.content || ""))}}></div>
      </div>
    </div>);
  }
}

export async function getServerSideProps({ req, res, resolvedUrl }){
  let id = (resolvedUrl.split`/`[resolvedUrl.split`/`.length-1].replace(/\?.*/g,"").replace(/\#.*/g,""))
  let data = await fetch("https://replqapi.leviathancoding.repl.co/post/"+id).then(r => r.json());
  return {
    props: {
      data: data,
    }
  }
}