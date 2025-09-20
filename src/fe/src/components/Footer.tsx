import React from "react";
import "../style/layout.css";
import { FaRegCopyright } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="footer-des dark:dark-footer-des flex justify-center items-center p-4">
      <div className="flex flex-row items-center">
        <FaRegCopyright clasName="pr-1"/> 2025 Pham Thi Phuong Nam
      </div>
    </footer>
  );
}
