"use client";
import { useState } from "react";
import "./create_projectbutton.css";

export default function CreateProjectButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button className="button_" onClick={() => setShowForm(true)}>
        + Create Project
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Project</h2>

            <form>
              <input
                type="text"
                placeholder="Project name"
                className="w-full mb-2 p-2 border rounded"
              />

              <textarea
                placeholder="Description"
                className="w-full mb-2 p-2 border rounded"
              ></textarea>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Create
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
