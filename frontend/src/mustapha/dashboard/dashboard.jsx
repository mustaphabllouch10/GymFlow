import Kpis from "./Kpis";  
import Plans from "./plans";

export default function Dashboard() {
    

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <Kpis />
            <Plans />

        </div>
    );
     
}