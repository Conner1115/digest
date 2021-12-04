import Link from "next/link";
import convert from "./lang2icons"
import Image from 'next/image';

export default function FTPost(props) {
    return (
      <Link href={"/post/"+props.slug} passHref>
      <div className="ftpost">
        <img src={convert[props.lang]} alt="Icon"/>
        <div>{props.title}</div>
      </div>
      </Link>
    )
}