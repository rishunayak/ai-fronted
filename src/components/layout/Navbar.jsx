import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { Button } from "../ui/Button.jsx";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "New Task",  to: "/tasks/new" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-xl bg-[#07070f]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-900/50">
            AI
          </div>
          <span className="font-bold text-white hidden sm:block">TaskPlatform</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden sm:flex items-center gap-1 flex-1">
          {NAV_LINKS.map(({ label, to }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${active
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right: user + logout */}
        <div className="ml-auto flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-violet-300 text-xs font-bold uppercase">
                {user.name?.[0] ?? user.email?.[0] ?? "U"}
              </div>
              <span className="text-sm text-white/60 max-w-[120px] truncate">{user.name || user.email}</span>
            </div>
          )}
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
