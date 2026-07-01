import GetSubs from './getSubs';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function getSubscriptionStatus(endDate) {
  const end = new Date(endDate);
  const today = new Date();
  end.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round((end - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      isActive: false,
      label: 'Expired',
      timeText: `Expired ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago`,
    };
  }
  if (diffDays === 0) {
    return { isActive: true, label: 'Active', timeText: 'Expires today' };
  }
  return {
    isActive: true,
    label: 'Active',
    timeText: `${diffDays} day${diffDays === 1 ? '' : 's'} left`,
  };
}

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const filteredSubscriptions = subscriptions.filter((subscription) =>
    subscription.member.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ..."
            className="w-full bg-white rounded-xl pl-11 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none border border-gray-100"
          />
        </div>

        <button
          type="button"
          className="bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Add Subscription
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">
                  Member
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">
                  Plan
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">
                  Start Date
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">
                  End Date
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900">
                  Time Remaining
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-16">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <AiOutlineLoading3Quarters className="animate-spin text-4xl text-gray-400" />
                      <p className="text-sm text-gray-500">
                        Loading subscriptions...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredSubscriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16">
                    <p className="text-center text-sm text-gray-500">
                      No subscriptions found.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredSubscriptions.map((subscription) => {
                  const status = getSubscriptionStatus(subscription.end_date);
                  return (
                    <tr
                      key={subscription.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {subscription.member.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {subscription.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {subscription.start_date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {subscription.end_date}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                            status.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              status.isActive ? 'bg-green-500' : 'bg-gray-400'
                            }`}
                          />
                          {status.label}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 text-sm ${
                          status.isActive ? 'text-gray-700' : 'text-red-600'
                        }`}
                      >
                        {status.timeText}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <GetSubs
        subscriptions={subscriptions}
        setSubscriptions={setSubscriptions}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}