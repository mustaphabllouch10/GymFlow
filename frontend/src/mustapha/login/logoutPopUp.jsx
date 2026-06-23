import { useNavigate } from "react-router-dom";

export default function LogoutPopUp({ confirmLogout, setConfirmLogout }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-[340px] max-w-[90vw]">
        
        <div className="flex flex-col items-center gap-1.5 pb-5">
          <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Sign out</h2>
          <p className="text-sm text-gray-500 text-center">
            Are you sure you want to sign out of your account?
          </p>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={() => setConfirmLogout(true)}
            className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 active:scale-[0.98] transition-all"
          >
            Yes, sign me out
          </button>
          <button
            onClick={() => { setConfirmLogout(false); navigate(-1); }}
            className="w-full py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm hover:bg-gray-100 active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}