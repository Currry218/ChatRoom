import Header from "../components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  console.log("API base:", import.meta.env.VITE_API_URL);
  return (
    <div className="flex flex-col min-h-screen max-w-screen">
      <Header />
      <main className="flex-1 h-full ">{children}</main>
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};
export default MainLayout;
