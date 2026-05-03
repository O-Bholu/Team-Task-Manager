import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="text-lg font-semibold text-brand-700">
          Team Task Manager
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link to="/dashboard" className="text-slate-700 hover:text-brand-700">
            Dashboard
          </Link>
          <Link to="/projects" className="text-slate-700 hover:text-brand-700">
            Projects
          </Link>
          <Link to="/tasks" className="text-slate-700 hover:text-brand-700">
            Tasks
          </Link>
          {user && <span className="rounded bg-slate-100 px-2 py-1">{user.role}</span>}
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
