const months = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function Calendar() {
  return (
    <div className="grid grid-cols-4">
      {months.map((name, idx) => (
        <div
          key={idx}
          className="rounded-2xl shadow-lg border border-slate-200 bg-transparent flex items-stretch"
        >
          <div className="w-full p-4 flex items-center justify-center">
            <div className="w-full aspect-square flex flex-col items-center justify-start p-4">
              <div className="w-full text-center">
                <h2 className="text-2xl font-bold capitalize">{name}</h2>
              </div>

              <div className="mt-3 w-full h-full border-2 border-dashed border-slate-100 bg-white/40 p-4 space-y-3 text-lg">
                <p>teste1</p>
                <p>teste2</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Calendar;
