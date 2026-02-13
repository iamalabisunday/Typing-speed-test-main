import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen grid place-items-center bg-black">
      {/* NotFound Page Content Section */}
      <div className="text-white text-center">
        {/* Header Section */}
        <h1 className="font-bold text-[12rem]">404</h1>
        {/* Body Section */}
        <div className="text-2xl flex flex-col gap-2 font-light">
          <h2>Page Not Found</h2>
          <p>The page you’re looking for doesn’t exist.</p>
        </div>
        {/* Navigarion back to Home Section */}
        <nav className="w-full mt-12 grid place-items-center">
          <Link to="/" className="w-fit text-2xl border-2 py-2 px-8">
            Go Back Home
          </Link>
        </nav>
      </div>
    </div>
  );
}
