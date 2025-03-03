import { useState, useEffect } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import { useStreak } from "../context/StreakContext";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const { updateStreak } = useStreak();

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Priority color mapping
  const priorityColors = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-400 text-black",
    low: "bg-green-500 text-white",
  };

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false, priority }]);
    setNewTask("");
    setPriority("low");
  };

  // Toggle task completion and update streak
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    const wasCompleted = updatedTasks[index].completed;
    updatedTasks[index].completed = !updatedTasks[index].completed;

    setTasks(updatedTasks);

    // Update streak only when marking a task as completed
    if (!wasCompleted) {
      updateStreak();
    }
  };

  // Delete a task
  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  // Start editing a task
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
    setEditPriority(tasks[index].priority);
  };

  // Save edited task
  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editText;
    updatedTasks[index].priority = editPriority;
    setTasks(updatedTasks);

    setEditingIndex(null);
  };

  return (
    <div className="flex items-center justify-center w-full p-6 mt-4">
      <div className="w-full max-w-2xl sm:max-w-[90%] bg-white bg-opacity-20 backdrop-blur-lg shadow-xl p-6 rounded-2xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-black">
          ✨ My Tasks
        </h2>

        {/* Input Section */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-500 bg-opacity-25 rounded-xl">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 min-w-0 px-4 py-2 text-white placeholder-gray-300 bg-transparent border-none outline-none"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-2 py-1 text-white bg-gray-800 rounded-lg"
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>

          <button
            onClick={addTask}
            className="w-full px-4 py-1 text-white transition-all bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <Reorder.Group
          axis="y"
          values={tasks}
          onReorder={setTasks}
          className="mt-6 space-y-3"
        >
          <AnimatePresence>
            {tasks.map((task, index) => (
              <Reorder.Item
                key={index}
                value={task}
                className="flex flex-wrap items-center justify-between p-4 text-white transition-all bg-gray-800 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {editingIndex === index ? (
                  <div className="flex flex-wrap w-full gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 min-w-0 px-2 py-1 text-white bg-gray-700 rounded-lg outline-none"
                    />

                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                      className="px-2 py-1 text-white bg-gray-700 rounded-lg"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🔴 High</option>
                    </select>

                    <button
                      onClick={() => saveEdit(index)}
                      className="px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center w-full gap-2">
                    <span
                      className={`flex-1 min-w-0 cursor-pointer ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                      onClick={() => toggleTask(index)}
                    >
                      {task.text}
                    </span>

                    <span
                      className={`px-4 py-1 text-xs font-bold rounded-lg ${
                        priorityColors[task.priority]
                      }`}
                    >
                      {task.priority === "high"
                        ? "🔴 High"
                        : task.priority === "medium"
                        ? "🟡 Medium"
                        : "🟢 Low"}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(index)}
                        className="px-2 py-1 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => deleteTask(index)}
                        className="px-2 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                )}
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </div>
    </div>
  );
};

export default TodoList;
