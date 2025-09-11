import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";

function App() {
  const [page, setPage] = React.useState("dashboard");

  return (
    <div>
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col">
          <Navbar setPage={setPage} />
          <main className="p-6 flex-1 overflow-y-auto">
            {page === "dashboard" && <Dashboard />}
            {page === "calendar" && <Calendar />}
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
