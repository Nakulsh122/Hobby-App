import React from 'react'

const HOBBYCARD = ({hobby,onAddStreak}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-72">
      {/* Hobby Name */}
      <h2 className="text-xl font-semibold text-gray-800">{hobby.hobbyName}</h2>
      
      {/* Hobby Type */}
      <p className="text-gray-500 text-sm capitalize">{hobby.type} Hobby</p>

      {/* Streak-based hobby */}
      {hobby.type === "streak" && (
        <div className="mt-4">
          <p className="text-gray-700">🔥 Streak Count: {hobby.streakCount}</p>
          <button
            onClick={() => onAddStreak(hobby._id)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Streak
          </button>
        </div>
      )}

      {/* Progress-based hobby */}
      {hobby.type === "progress" && (
        <div className="mt-4">
          <p className="text-gray-700">
            📈 Progress: {hobby.progress.currentProgress} / {hobby.progress.totalGoal} {hobby.progress.unit}
          </p>
          <p className="text-gray-500 text-sm">Goal: {hobby.progress.goal}</p>
        </div>
      )}
    </div>
  );
}

export default HOBBYCARD
