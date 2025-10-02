import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import AuthPage from "./pages/Auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useEffect } from "react";
import "./App.css";
import NotFound from './pages/NotFound';

function App() {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") || "light"
    );
  }, []);

  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/chatroom"
              element={
                <ProtectedRoute>
                  <ChatRoom />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
