import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import TravelDetail from "./pages/TravelDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { supabase } from "@/lib/supabase";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
    if (isAuthenticated === null) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      );
    }

    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <SignUp />
            </AuthRedirect>
          }
        />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="p-6 flex-1 overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/travel/:id" element={<TravelDetail />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
