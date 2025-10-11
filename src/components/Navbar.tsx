import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <header className="bg-gray-100 border-b flex px-6 gap-4 py-4 items-center">
      <Link
        to="/dashboard"
        className={`px-3 py-1 rounded transition-colors ${
          location.pathname === "/" || location.pathname === "/dashboard"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200"
        }`}
      >
        Dashboard
      </Link>

      <Link
        to="/calendar"
        className={`px-3 py-1 rounded transition-colors ${
          location.pathname === "/calendar"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200"
        }`}
      >
        Calendário
      </Link>
    </header>
  );
}

export default Navbar;
