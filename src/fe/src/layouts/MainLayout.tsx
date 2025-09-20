import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen  ">
      <Header />
      <main className="flex-1 h-full">{children}</main>
      <Footer />
    </div>
  );
}
export default MainLayout;