"use client";

export const ReloadButton = () => {
  return (
    <button
      onClick={() => window.location.reload()}
      className="bg-gray-800 text-white px-4 py-2 rounded-md"
    >
      View Detail
    </button>
  );
};
