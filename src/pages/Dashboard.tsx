import CardTravels from "@/components/CardTravels";
import CardWishlist from "@/components/CardWishlist";

function Dashboard() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <CardTravels />
      <CardWishlist />
    </div>
  );
}

export default Dashboard;
