import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <nav>
      <Link
        to="/"
        className="font-bold text-3xl text-blue-600 tracking-tighter"
      >
        Photo<span className="text-fuchsia-600">form</span>
      </Link>
    </nav>
  );
};
