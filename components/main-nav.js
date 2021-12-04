import Link from 'next/link'
export default function Navbar (){
  return (
    <div id="nav-bar">
      <Link href="/" passHref><button className="submit-button">Home</button></Link>
      <Link href="/about" passHref><button className="submit-button">About</button></Link>
      <Link href="/post/61a8fd82300f1faebf268e19" passHref><button className="submit-button">API</button></Link>
      <Link href="/request" passHref><button className="submit-button">Request Access</button></Link>
    </div>
  );
}