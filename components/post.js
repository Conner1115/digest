import Link from "next/link"
import convert from "./lang2icons"
import Image from 'next/image'

export default function Post(props) {
    return (<div className="post">
      <div className="post-top-cov">
        <img src={convert[props.lang]}  alt="Language icon"/>
        <Link href={"/post/"+props.slug} passHref><div style={{marginLeft: 10}}>{props.title}</div></Link>
      </div>
      <div className="post-desc">{props.description}</div>
      <div className="post-link">
        <Link className="post-more" href={"/post/"+props.slug}>Read More &gt;&gt;</Link>
      </div>
      <div className="post-foot">
        <div className="post-tags">{props.tags.map(x => <span className="post-tag" key={x}>#{x}</span>)}</div>
      </div>
    </div>)
}