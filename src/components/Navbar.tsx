import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const fullName =
            (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "User";
          
          const userImage =
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            "";

          setUserName(fullName);
          setUserImage(userImage);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-gray-100 border-b flex px-6 gap-4 py-4 items-center justify-between">
      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className={`px-3 py-1 rounded transition-colors ${
            location.pathname === "/" || location.pathname === "/dashboard"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/calendar"
          className={`px-3 py-1 rounded transition-colors ${
            location.pathname === "/calendar" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          Calendar
        </Link>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        {!isLoading && userName && (
          <div className="flex items-center gap-3">
            <div className="text-right flex gap-2 items-center">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              
              <img
                src={userImage || "/default-avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>

            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
