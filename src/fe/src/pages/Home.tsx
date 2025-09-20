import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-800 text-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Chat Room </h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl">
        Connect, share, and chat with people instantly.  
        Here you can meet new friends from all over the world. 
        No download, no setup & no registration needed.
      </p>
      <Link
        to="/chatroom"
        className="bg-white text-gray-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;
