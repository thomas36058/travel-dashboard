interface NavbarProps {
  setPage: React.Dispatch<React.SetStateAction<string>>
}

function Navbar({ setPage }: NavbarProps) {
  return (
    <header className="bg-gray-100 border-b flex px-6 gap-4 py-4">
      <button onClick={() => setPage("dashboard")}>
        Dashboard
      </button>
      <button onClick={() => setPage("calendar")}>
        Calendário
      </button>
    </header>
  )
}

export default Navbar