import Link from "next/link"

export const Navbar = () => {
  return (
    <nav className="flex justify-center gap-10 p-4">
      <Link href="/" className="text-zinc-300 font-medium hover:text-white">Home</Link>
      <Link href="/signin" className="text-zinc-300 font-medium hover:text-white">Sign In</Link>
    </nav>
  )
}
