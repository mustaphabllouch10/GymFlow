import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiUsers,
  FiLogIn,
  FiCalendar,
  FiAlertCircle,
} from "react-icons/fi";

const KpiCard = ({ icon: Icon, label, value, sub }) => (
  <div className="rounded-2xl px-5 py-4 flex flex-col gap-3 bg-white border border-gray-200 text-gray-900">
    
    {/* icon + label */}
    <div className="flex items-center gap-2">
      <Icon className="text-lg text-gray-400" />
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </span>
    </div>

    {/* value */}
    <p className="text-3xl font-semibold leading-none text-gray-900">
      {value ?? <span className="text-gray-300 text-2xl">—</span>}
    </p>

    {/* sub */}
    <p className="text-xs text-gray-400">{sub}</p>
  </div>
);

export default function Kpis() {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setKpis(data);
      } catch (error) {
        console.error("Error fetching KPIs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKpis();
  }, []);

  const cards = [
    {
      icon: FiUsers,
      label: "Active Members",
      value: kpis?.activeMembersCount,
      sub: "Total members with active status",
    },
    {
      icon: FiLogIn,
      label: "Currently Inside",
      value: kpis?.activeAttendanceCount,
      sub: "Checked in, not yet checked out",
    },
    {
      icon: FiCalendar,
      label: "Today's Check-ins",
      value: kpis?.todayAttendanceCount,
      sub: "Total entries recorded today",
    },
    {
      icon: FiAlertCircle,
      label: "Expiring Soon",
      value: kpis?.aboutToExpireSubscriptionsCount,
      sub: "Subscriptions expiring within 7 days",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <KpiCard
          key={card.label}
          {...card}
          value={loading ? null : card.value}
        />
      ))}
    </div>
  );
}