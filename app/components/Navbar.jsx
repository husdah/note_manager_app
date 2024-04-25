import Link from 'next/link'
import Image from 'next/image'
import Logo from './logo.png'

export default function Navbar() {
  return (
    <nav>
    <Image
        src={Logo}
        alt='logo'
        width={70}
        quality={100}
        placeholder='blur'
    />
    <h1>Note Manager App</h1>
    <Link href="/">Notes</Link>
    <Link href="/notes/create">Add Note</Link>
  </nav>
  )
}
