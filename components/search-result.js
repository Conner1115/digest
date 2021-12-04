import Link from "next/link";
import Image from 'next/image'

export default function Result(props) {
    return (
      <Link href={"/post/" + props.slug} passHref>
      <div className="sr">
        <img alt="" src={props.lang}/>
        <div>{props.text}</div>
      </div>
      </Link>
    )
}