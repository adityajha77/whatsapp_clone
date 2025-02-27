"use client";

import { useQuery, useMutation } from "convex/react"; // Import useMutation
import { api } from "../../../convex/_generated/api";

const TasksPage = () => {
  const tasks = useQuery(api.tasks.getTasks);
  const deleteTask = useMutation(api.tasks.deleteTask);

  if (tasks === undefined) {
    return <p className="p-10 text-2xl">Loading tasks...</p>;
  }

  return (
    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-5xl font-bold">ALL TASKS ARE HERE IN REAL TIME</h1>

      {tasks.length === 0 ? (
        <p className="text-lg">No tasks available.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`p-4 flex justify-between items-center rounded-lg shadow-md ${
                task.completed ? "bg-green-200" : "bg-red-200"
              }`}
            >
              <span className="text-xl">{task.text}</span>
              {task.completed && <span className="ml-2 text-sm text-gray-600">(Completed)</span>}
              <button
                onClick={async () => {
                  await deleteTask({ id: task._id });
                }}
                className="ml-4 px-3 py-1 text-white bg-red-500 hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksPage;
