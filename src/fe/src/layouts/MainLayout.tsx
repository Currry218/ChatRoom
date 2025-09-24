import Header from "../components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen max-w-screen">
      <Header />
      <main className="flex-1 h-full ">{children}</main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
export default MainLayout;
