import React from "react";
import Header from "../components/Header";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 h-full ">{children}</main>
    </div>
  );
};
export default MainLayout;
