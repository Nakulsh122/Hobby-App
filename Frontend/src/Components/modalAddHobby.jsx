import React, { useState } from "react";

const HobbyModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    userId : "",
    hobbyName: "",
    type: "streak",
    subtype: "",
    streakCount: 0,
    lastupdated: new Date(),
    progress: {
      unit: "",
      totalGoal: "",
      currentProgress: 0,
      goal: "",
      startDate: new Date(),
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      progress: { ...prev.progress, [name]: value },
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Hobby</h2>

        <div className="mb-2">
          <label className="text-sm font-medium">Hobby Name</label>
          <input
            type="text"
            name="hobbyName"
            value={formData.hobbyName}
            onChange={handleChange}
            placeholder="Enter hobby name"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-2">
          <label className="text-sm font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="streak">Streak-Based</option>
            <option value="progress">Progress-Based</option>
          </select>
        </div>

        {formData.type === "progress" && (
          <>
            <div className="mb-2">
              <label className="text-sm font-medium">Unit</label>
              <input
                type="text"
                name="unit"
                value={formData.progress.unit}
                onChange={handleProgressChange}
                placeholder="e.g., pages, km, hours"
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-2">
              <label className="text-sm font-medium">Total Goal</label>
              <input
                type="number"
                name="totalGoal"
                value={formData.progress.totalGoal}
                onChange={handleProgressChange}
                placeholder="Enter goal (e.g., 100 pages)"
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-2">
              <label className="text-sm font-medium">Goal Description</label>
              <input
                type="text"
                name="goal"
                value={formData.progress.goal}
                onChange={handleProgressChange}
                placeholder="e.g., Read 100 pages in a month"
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HobbyModal;
