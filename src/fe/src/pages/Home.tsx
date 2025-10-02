import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../App.css";
const Home = () => {
  return (
    <>
      <div
        className="flexing-c min-h-screen w-full text-center relative overflow-x-hidden "
        style={{
          backgroundPosition: "left 70%",
          backgroundImage:
            "url('https://media.istockphoto.com/id/1326041038/vi/vec-to/doodles-ph%C6%B0%C6%A1ng-ti%E1%BB%87n-truy%E1%BB%81n-th%C3%B4ng-x%C3%A3-h%E1%BB%99i-m%E1%BA%A1ng-x%C3%A3-h%E1%BB%99i-internet-c%C3%B4ng-ngh%E1%BB%87-m%C3%A1y-t%C3%ADnh-blog-ti%E1%BA%BFp.jpg?s=612x612&w=0&k=20&c=bhRx4QoqkCUJGa2TjC9OVw7H41n539Gf-wPvCyZpl2k=')",
        }}
      >
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Bubble Image */}
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/663/915/large_2x/speech-bubble-talk-bubble-chat-bubble-icon-transparent-free-png.png"
            alt="chat bubble"
            className="w-full h-auto object-contain"
          />

          {/* Text inside bubble */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Welcome to Chat Room
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl text-black">
              Connect, share, and chat with people instantly. Here you can meet
              new friends from all over the world. No download, no setup & no
              registration needed.
            </p>
            <Link
              to="/chatroom"
              className="confirm-button font-semibold px-6 py-3 rounded-full shadow-md bg-white/80 hover:bg-white transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
