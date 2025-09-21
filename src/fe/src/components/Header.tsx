import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const toggleTheme = () => {
  const newTheme =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  console.log("Theme switched to:", newTheme);
};

export default function Header() {
  return (
    <header className="p-3 flex gap-4 items-center shadow-sm header-des dark:dark-header-des h-[10vh]">
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

      <label className="switch">
        <input type="checkbox" onChange={toggleTheme} />
        <span className="slider round" />
      </label>

      <div className="flex gap-2 ml-4">
        <button className="px-2 py-1">Login</button>
        <button className="px-2 py-1">Register</button>
      </div>

      <div className="flex flex-row items-center justify-center ml-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="avatar"
          className="w-6 h-6 rounded-full object-cover"
        />
        <div className="px-2">USERNAME</div>
      </div>
    </header>
  );
}
