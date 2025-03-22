import React, { useEffect, useState } from "react";

const PROGRESSMODAL = ({ data, onClose, onSave, onComplete }) => {
  const [addition, setAddition] = useState("");
  const [hobbyData, setData] = useState({});

  const handleChange = (e) => {
    setAddition(Number(e.target.value));
  };

  const handleSubmit = () => {
    let newProgress = data.progress.currentProgress + addition;
    if (newProgress >= data.progress.totalGoal) {
      newProgress = data.progress.totalGoal;
      onComplete();
    }

    const updatedHobby = {
      ...data,
      progress: {
        ...data.progress,
        currentProgress: newProgress
      },
    };
    
    onSave(updatedHobby);
    onClose();
  };

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Progress</h2>
        <p className="mb-2">Current Progress: {data?.progress?.currentProgress}</p>
        <label className="block mb-2">Add Progress:</label>
        <input 
          type="number" 
          name="addition" 
          placeholder="0"
          value={addition} 
          onChange={handleChange} 
          className="w-full border p-2 rounded-md mb-3" 
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:opacity-80">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:opacity-80">Save</button>
        </div>
      </div>
    </div>
  );
};

export default PROGRESSMODAL;