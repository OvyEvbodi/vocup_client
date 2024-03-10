import Link from "next/link";

const Header = () => {
    return (
        <header className="text-dark_text p-4  h-[8vh] flex justify-between">
            <h1 className="font-extrabold text-xl lg:text-3xl">VocUp</h1>
            <nav className="flex justify-between min-w-[40vw] gap-2">
              <Link href="/" className="nav_link">Home</Link>
              <Link href="/profile" className="nav_link">Profile</Link>
              <Link href="/signin" className="nav_link">Sign in</Link>
            </nav>
        </header>
    )
};

export default Header