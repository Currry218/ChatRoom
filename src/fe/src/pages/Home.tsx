
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="flexing-c min-h-screen max-w-screen text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Chat Room{" "}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Connect, share, and chat with people instantly. Here you can meet new
          friends from all over the world. No download, no setup & no
          registration needed.
        </p>
        <Link
          to="/chatroom"
          className="confirm-button font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Home;
