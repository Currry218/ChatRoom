import "../style/layout.css";
import { FaRegCopyright } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="footer-des flex justify-center items-center p-4 shadow-md">
      <div className="flexing-r gap-1">
        <FaRegCopyright /> 2025 - Pham Thi Phuong Nam
      </div>
    </footer>
  );
}
