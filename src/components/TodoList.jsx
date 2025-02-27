import { useState, useEffect } from "react";
import { AnimatePresence, Reorder } from "framer-motion";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const priorityColors = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-400 text-black",
    low: "bg-green-500 text-white",
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false, priority }]);
    setNewTask("");
    setPriority("low");
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
    setEditPriority(tasks[index].priority);
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editText;
    updatedTasks[index].priority = editPriority;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  return (
    <div className="flex justify-center items-center p-6 mt-4 w-full">
      <div className="w-full max-w-2xl sm:max-w-[90%] bg-white bg-opacity-20 backdrop-blur-lg shadow-xl p-6 rounded-2xl">
        <h2 className="text-3xl font-semibold text-center text-black mb-6">✨ My Tasks</h2>

        {/* Input Section */}
        <div className="flex flex-wrap items-center gap-2 bg-gray-500 bg-opacity-25 rounded-xl p-3">
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
            className="px-2 py-1 bg-gray-800 text-white rounded-lg"
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
          <button
            onClick={addTask}
            className="px-4 py-1 w-full sm:w-auto bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <Reorder.Group axis="y" values={tasks} onReorder={setTasks} className="mt-6 space-y-3">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <Reorder.Item
                key={index}
                value={task}
                className="flex flex-wrap justify-between items-center bg-gray-800 text-white p-4 rounded-lg shadow-lg transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {editingIndex === index ? (
                  <div className="flex w-full flex-wrap gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 min-w-0 px-2 py-1 bg-gray-700 text-white rounded-lg outline-none"
                    />
                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                      className="px-2 py-1 bg-gray-700 text-white rounded-lg"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🔴 High</option>
                    </select>
                    <button
                      onClick={() => saveEdit(index)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2 w-full">
                    <span
                      className={`flex-1 min-w-0 cursor-pointer ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                      onClick={() => toggleTask(index)}
                    >
                      {task.text}
                    </span>
                    <span className={`px-4 py-1 text-xs font-bold rounded-lg ${priorityColors[task.priority]}`}>
                      {task.priority === "high" ? "🔴 High" : task.priority === "medium" ? "🟡 Medium" : "🟢 Low"}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(index)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTask(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
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
