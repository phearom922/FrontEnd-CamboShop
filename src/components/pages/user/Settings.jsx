import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
// Function to update username (สมมติว่าใน functions/users.js)
import { updateUsername } from "../../functions/users";

const Settings = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ตั้งค่า username เดิมถ้ามี
    if (user && user.username) {
      setNewUsername(user.username);
    }
  }, [user]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await updateUsername(user.token, { newUsername });
    toast.success("Username updated successfully");
    dispatch({
      type: "LOGIN",
      payload: {
        token: user.token,
        username: newUsername,
        role: user.role,
      },
    });
    navigate("/user/index");
  } catch (err) {
    toast.error(err.response?.data?.error || "Failed to update username");
    console.error("Error updating username:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-700">
          Edit Username
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-600"
              htmlFor="newUsername"
            >
              New Username
            </label>
            <input
              type="text"
              id="newUsername"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter new username"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update Username"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          <a href="/user/index" className="text-blue-600 hover:underline">
            Back to Profile
          </a>
        </p>
      </div>
    </div>
  );
};

export default Settings;