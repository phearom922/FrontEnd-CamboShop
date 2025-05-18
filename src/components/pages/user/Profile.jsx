import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlinePhotoCamera } from "react-icons/md";
// Functions
import { getUserProfile, updateAddress, uploadProfilePicture } from "../../functions/users";

const Profile = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
    usernameTelegram: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await getUserProfile(user.token);
      setProfile(res.data || {});
      setAddress(res.data.address || {});
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const handleSaveAddress = async () => {
    setLoading(true);
    try {
      const res = await updateAddress(user.token, { address });
      setProfile({ ...profile, address: res.data.address });
      setIsEditingAddress(false);
      toast.success("Address updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT", payload: null });
    navigate("/login");
  };

  const handleUploadPicture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    setUploading(true);
    try {
      const res = await uploadProfilePicture(user.token, formData);
      setProfile({ ...profile, profilePicture: res.data.profilePicture });
      toast.success("Profile picture updated successfully");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Failed to upload picture");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex  justify-center">
      <div className="flex w-full max-w-7xl bg-white border-gray-100 space-x-2 rounded-lg overflow-hidden">
        {/* Left Panel: Profile Info */}
        <div className="w-2/3 p-6 border border-gray-200 rounded-lg">
          <div className="text-center items-center flex flex-col">

            <div className="text-center">
              <div className=" relative w-35 h-35 rounded-full overflow-hidden">
                <img
                  src={profile.profilePicture || "https://avatar.iran.liara.run/public"}
                  alt="Profile"
                  className="w-35 h-35 mx-auto rounded-full mb-4 object-cover "
                />
                <label className="cursor-pointer  text-white  ">
                  <div className="bg-gray-800 opacity-70 absolute w-full bottom-0  py-1 items-center flex justify-center">
                    {uploading ? "loading..." : <MdOutlinePhotoCamera size={25} />}</div>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="hidden"
                    onChange={handleUploadPicture}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <div className="text-xl flex items-center font-semibold text-gray-600 gap-2">
              Username : <span className="text-green-600">{user.username}</span>
              <FaRegEdit
                onClick={() => navigate("/user/settings")}
                className="text-green-600 cursor-pointer"
              />
            </div>
            <div className="text-gray-600 rounded-full  bg-green-200 px-4 ">Role : <span className="text-green-600">{user.role}</span></div>
          </div>
          <div className="mt-6 space-y-4">
            <hr className="border-gray-200" />
            <p><strong>Date Join:</strong> {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "16 May, 2025"}</p>
            <p><strong>Status:</strong> <span className="text-green-600">Active</span></p>
            <p><strong>Phone Number:</strong> {profile.phoneNumber || "N/A"}</p>
            <p><strong>Email:</strong> {profile.email || "user@telegram.com"}</p>
            <p><strong>Telegram Username:</strong> @{profile.telegramUsername || "N/A"}</p>
            <p><strong>Last Login:</strong> {profile.lastLogin || "16 May, 2025"}</p>
            <div className="mt-8 space-x-2 justify-between flex">
              <button
                onClick={() => navigate("/change-password")}
                className="bg-yellow-500 text-white py-2 px-3 rounded hover:bg-yellow-600"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600"
              >
                Logout
              </button>

            </div>
          </div>
        </div>

        {/* Right Panel: Address */}
        <div className="w-2/3  border border-gray-200 rounded-lg">
          <div className="bg-blue-800 text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-semibold">Ron Phearom</h2>
            <p>+66 10255585</p>
            <p>phnom penh, Str.2004,</p>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-4">Address</h2>
              <button
                onClick={handleEditAddress}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mb-4"
              >
                Edit Address
              </button>
            </div>
            <hr className=" border-gray-200 mb-4" />
            {isEditingAddress ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={address.phoneNumber}
                  onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  placeholder="Pincode"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={address.area}
                  onChange={(e) => setAddress({ ...address, area: e.target.value })}
                  placeholder="Area"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="City"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  placeholder="State"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={address.usernameTelegram}
                  onChange={(e) => setAddress({ ...address, usernameTelegram: e.target.value })}
                  placeholder="Telegram Username"
                  className="w-full p-2 border rounded"
                />
                <div className="space-x-2">
                  <button
                    onClick={handleSaveAddress}
                    className="bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setIsEditingAddress(false)}
                    className="bg-gray-500 text-white py-2 px-3 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between">
                <div className="flex-col justify-between flex gap-3.5">
                  <p><strong>Full Name:</strong> {address.fullName || "Ron Phearom"}</p>
                  <p><strong>Phone Number:</strong> {address.phoneNumber || "+66 10255585"}</p>
                  <p><strong>Pincode:</strong> {address.pincode || "11213"}</p>
                  <p><strong>Area:</strong> {address.area || "Str.2004"}</p>
                  <p><strong>City:</strong> {address.city || "Phnom Penh"}</p>
                  <p><strong>State:</strong> {address.state || "Phnom Penh"}</p>
                  <p><strong>Telegram Username:</strong> @{address.usernameTelegram || "N/A"}</p>
                  <a href="https://goo.gl/maps/vDjzT1cNdNQ9JJ9" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    Google Map: https://goo.gl/maps/vDjzT1cNdNQ9JJ9
                  </a>
                </div>
                <div>
                  <button
                    onClick={() => navigate("/connect-telegram")}
                    className="bg-blue-500 text-white py-2 px-3 mt-4  rounded hover:bg-blue-600"
                  >
                    Connect Telegram
                  </button>
                </div>
              </div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;