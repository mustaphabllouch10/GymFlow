import Kpis from "./Kpis";  
import Plans from "./plans";
import CheckinSummary from "./checkinSummary";
import SubSummary from "./subSummary";
import Chart from "./chart";


export default function Dashboard() {
    

    return (
        <div className="p-6">
            <Kpis />
            <div className="flex gap-10  items-start">
                <div className="w-[70%]">
                    <Chart />
                </div>

                <div className="w-[30%]">
                    <Plans />
                </div>
            </div>
            <div className="flex gap-5 items-start">
                <div className="w-[70%]">
                    <CheckinSummary />
                </div>
                <div className="w-[30%]">
                    <SubSummary />
                </div>
            </div>
            
            

        </div>
    );
     
}