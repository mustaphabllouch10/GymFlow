import { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AddMember({ onClose }) {
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
  });
  const [error, setError] = useState("");

  const closeModal = () => {
    if (onClose) onClose();
  };

  const handleSubmit = async () => {
    const trimmedName = newMember.name.trim();
    const trimmedEmail = newMember.email.trim();
    const trimmedPhone = newMember.phone.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedName) {
      setError("Enter a name.");
      return;
    }
    if (!emailOk) {
      setError("Enter a valid email.");
      return;
    }
    if (!trimmedPhone) {
      setError("Enter a phone number.");
      return;
    }
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/members",
        {
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          status: newMember.status,
          joined_date: new Date().toISOString().split("T")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setNewMember({ name: "", email: "", phone: "", status: "active" });
      closeModal();
    } catch (err) {
      console.error("Error adding member:", err);
      setError("Couldn't add member. Try again.");
    }
  };

  const modal = (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center p-4 z-[9999]"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
        >
          &times;
        </button>

        <h1 className="text-xl font-bold text-gray-900 mb-6">Add Member</h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">
            {getInitials(newMember.name)}
          </div>
          <div>
            <p
              className={`text-lg font-bold ${
                newMember.name.trim() ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {newMember.name.trim() || "Member name"}
            </p>
            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              new
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <label
              htmlFor="name"
              className="block text-xs font-semibold tracking-wide text-gray-400 mb-1"
            >
              NAME
            </label>
            <input
              id="name"
              type="text"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
              placeholder="Fidel Larkin"
              className="w-full bg-transparent text-gray-900 text-sm outline-none placeholder-gray-300"
            />
          </div>

          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <label
              htmlFor="email"
              className="block text-xs font-semibold tracking-wide text-gray-400 mb-1"
            >
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              value={newMember.email}
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
              placeholder="name@example.org"
              className="w-full bg-transparent text-gray-900 text-sm font-mono outline-none placeholder-gray-300"
            />
          </div>

          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <label
              htmlFor="phone"
              className="block text-xs font-semibold tracking-wide text-gray-400 mb-1"
            >
              PHONE
            </label>
            <input
              id="phone"
              type="tel"
              value={newMember.phone}
              onChange={(e) =>
                setNewMember({ ...newMember, phone: e.target.value })
              }
              placeholder="+1-845-412-9148"
              className="w-full bg-transparent text-gray-900 text-sm font-mono outline-none placeholder-gray-300"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-4 h-11 rounded-xl bg-gray-900 hover:bg-gray-800 active:scale-[0.98] transition text-white text-sm font-semibold"
          >
            Add member
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}