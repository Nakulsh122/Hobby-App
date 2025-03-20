import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import callAPI from "../services/callAPI";
import USERMODAL from "./UserModal";
import { LogOutIcon, UserPen } from "lucide-react";

const user_url_base = "http://localhost:5000/api/v1/user";

const PROFILE = ({ sendUserScore, xp }) => {
  const [user, setUser] = useState(null);
  const [modalopen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [level, setLevel] = useState(0);
  const [xpPending, setXPPending] = useState(0); // Renamed from xppoints

  // Fetch user data
  const handle_data = async () => {
    const { id } = jwtDecode(localStorage.getItem("Token"));
    const data = await callAPI(`${user_url_base}/${id}`, "GET", undefined, undefined, localStorage.getItem("Token"));
    setUser(data);

    // Ensure XP is updated properly from fetched data
    if (data.total_xp !== undefined) {
      calc_level(data.total_xp);
    }
  };

  const update_user = async (data) => {
    console.log(data);
    const { id } = jwtDecode(localStorage.getItem("Token"));
    await callAPI(`${user_url_base}/${id}`, "PUT", data, undefined, localStorage.getItem("Token"));
    console.log("User Successfully updated");
    handle_data();
  };

  const calc_level = (points) => {
    let newLevel = Math.floor(points / 1000);
    setLevel(newLevel);

    let remainingXP = points % 1000 === 0 ? 0 : 1000 - (points % 1000);
    setXPPending(remainingXP); // Update remaining XP

    if (sendUserScore) {
      sendUserScore(points);
    }
  };

  const onclose = () => setModalOpen(false);

  useEffect(() => {
    handle_data();
  }, []);

  useEffect(() => {
    calc_level(xp); // Ensure XP updates when changed
  }, [xp]);

  return (
    <>
      {modalopen && <USERMODAL userData={user} isOpen={modalopen} onClose={onclose} onSave={update_user} />}
      <div className="h-full rounded flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <h1 className="text-4xl font-extrabold mb-6">Your Profile</h1>
        {user ? (
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg w-80 text-center">
            <div className="mb-4">
              <p className="text-lg font-semibold">{user.firstname || "User"} {user.lastname || ""}</p>
              <p className="text-sm text-gray-400">@{user.username}</p>
            </div>
            <div className="text-left space-y-2 text-sm">
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Mobile:</span> {user.mobile || "N/A"}</p>
              <p><span className="font-semibold">Account Created:</span> {new Date(user.created_at).toLocaleDateString()}</p>
              <p><span className="font-semibold">Total XP:</span> {user.total_xp}</p>
              <p><span className="font-semibold">Level :</span> {level}</p>
              <p><span className="font-semibold">XP till level up:</span> {xpPending}</p>
              <p><span className="font-semibold">Total Hobbies:</span> {user.total_hobbies}</p>

            </div>
            <div className="flex justify-around mt-6">
              <button
                className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                <LogOutIcon className="size-4 mr-2" /> Logout
              </button>
              <button
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={() => setModalOpen(true)}
              >
                <UserPen className="size-5 mr-2" /> Edit
              </button>
            </div>
          </div>
        ) : (
          <p className="text-lg font-semibold">Loading profile...</p>
        )}
      </div>
    </>
  );
};

export default PROFILE;
