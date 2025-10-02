import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import "../App.css";
// import ThemeSwitch from "./ThemeSwitch";
import { GrLogout } from "react-icons/gr";

export default function Header() {
  const { user } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/auth";
  }
  return (
    <header className="p-3 flex gap-4 items-center shadow-sm header-des h-[10vh]">
      <div className="flex items-center gap-2">
        <img src="/open.png" alt="logo" className="w-10 h-10" />
        <h1 className="font-bold text-lg">Chat Room</h1>
      </div>

      <nav className="flex gap-3">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/chatroom" className="hover:underline">
          ChatRoom
        </Link>
      </nav>

      <div className="flex-1" />

      {/* <ThemeSwitch /> */}

      <div className="flex gap-2 ml-4 items-center">
        {!user ? (
          <Link to="/auth" className="px-2 py-1">
            Login/Register
          </Link>
        ) : (
          <>
            <img
              src={
                user.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              className="w-6 h-6 rounded-full object-cover"
            />
            <div className="">{user.username}</div>
            <span className="px-2 cursor-pointer" title="Logout" onClick={handleLogout}>
              <GrLogout />
            </span>
          </>
        )}
      </div>
    </header>
  );
}
