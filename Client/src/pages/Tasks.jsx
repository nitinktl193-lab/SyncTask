import API_URL from "../config";
import "./Tasks.css";

import {
  useState,
  useEffect
} from "react";

import { toast } from "react-toastify";

import { motion } from "framer-motion";

function Tasks() {

  // STATES
  const [tasks, setTasks] =
    useState([]);

  const [taskInput, setTaskInput] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editText, setEditText] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [dueDate, setDueDate] =
    useState("");


  // LOAD TASKS
  useEffect(() => {

    const token =
      localStorage.getItem("token");

    fetch(
      "https://synctask-4nef.onrender.com/api/tasks",
      {
        headers: {
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {

          setTasks(data);

        }

      })
      .catch((err) => {

        console.log(err);

      });

  }, []);


  // ADD TASK
  const addTask = async () => {

    if (taskInput === "") {

      toast.error(
        "Please Enter Task"
      );

      return;

    }

    const token =
      localStorage.getItem("token");

    try {

      const res = await fetch(
        "https://synctask-4nef.onrender.com/api/tasks",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              token,
          },

          body: JSON.stringify({
            title: taskInput,

            priority,

            dueDate,
          }),
        }
      );

      const data =
        await res.json();

      setTasks([
        ...tasks,
        data,
      ]);

      setTaskInput("");

      setPriority("Medium");

      setDueDate("");

      toast.success(
        "Task Added"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Task Add Failed"
      );

    }
  };


  // DELETE TASK
  const deleteTask =
    async (id) => {

      const token =
        localStorage.getItem(
          "token"
        );

      try {

        await fetch(
         `https://synctask-4nef.onrender.com/api/tasks/${id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                token,
            },
          }
        );

        const updated =
          tasks.filter(
            (task) =>
              task._id !== id
          );

        setTasks(updated);

        toast.info(
          "Task Deleted"
        );

      } catch (error) {

        console.log(error);

      }
    };


  // COMPLETE TASK
  const completeTask = async (
    id,
    currentStatus
  ) => {

    const token =
      localStorage.getItem("token");

    try {

      const task =
        tasks.find(
          (t) => t._id === id
        );

      const updatedStatus =
        currentStatus ===
        "Completed"
          ? "Pending"
          : "Completed";

      const res = await fetch(
      `https://synctask-4nef.onrender.com/api/tasks/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              token,
          },

          body: JSON.stringify({
            title:
              task.title,

            status:
              updatedStatus,

            priority:
              task.priority,

            dueDate:
              task.dueDate,
          }),
        }
      );

      const updatedTask =
        await res.json();

      const updatedTasks =
        tasks.map((task) =>

          task._id === id
            ? updatedTask
            : task

        );

      setTasks(updatedTasks);

      toast.success(
        "Task Updated"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Update Failed"
      );
    }
  };


  // EDIT TASK
  const startEdit = (
    id,
    title
  ) => {

    setEditingId(id);

    setEditText(title);
  };


  // SAVE EDIT
  const saveEdit = async (id) => {

    const token =
      localStorage.getItem("token");

    try {

      const task =
        tasks.find(
          (t) => t._id === id
        );

      const res = await fetch(
       `https://synctask-4nef.onrender.com/api/tasks/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              token,
          },

          body: JSON.stringify({
            title: editText,

            status:
              task.status,

            priority:
              task.priority,

            dueDate:
              task.dueDate,
          }),
        }
      );

      const updatedTask =
        await res.json();

      const updatedTasks =
        tasks.map((task) =>

          task._id === id
            ? updatedTask
            : task

        );

      setTasks(updatedTasks);

      setEditingId(null);

      toast.success(
        "Task Saved"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Save Failed"
      );
    }
  };


  // SEARCH
  const filteredTasks =
    tasks.filter((task) =>
      task.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  return (

    <div className="tasks-page">

      {/* TOP */}
      <div className="tasks-top">

        <h1>

          Task Manager

        </h1>

        <div className="task-input">

          <input
            type="text"
            placeholder="Create task..."
            value={taskInput}
            onChange={(e) =>
              setTaskInput(
                e.target.value
              )
            }
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
          >

            <option>
              High
            </option>

            <option>
              Medium
            </option>

            <option>
              Low
            </option>

          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
          />

          <button
            onClick={addTask}
          >

            Add

          </button>

        </div>

        {/* SEARCH */}
        <input
          className="search-box"
          type="text"
          placeholder="Search task..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>


      {/* TASK GRID */}
      <div className="tasks-grid">

        {filteredTasks.length ===
        0 ? (

          <div className="empty">

            No Tasks Found

          </div>

        ) : (

          filteredTasks.map(
            (task) => (

              <motion.div
                key={task._id}
                className="task-card"
                whileHover={{
                  y: -8,
                }}
              >

                {/* TITLE */}
                {editingId ===
                task._id ? (

                  <input
                    value={editText}
                    onChange={(e) =>
                      setEditText(
                        e.target.value
                      )
                    }
                  />

                ) : (

                  <h2>
                    {task.title}
                  </h2>

                )}


                {/* STATUS */}
                <span
                  className={
                    task.status ===
                    "Completed"
                      ? "green"
                      : "purple"
                  }
                >

                  {task.status}

                </span>

                {/* PRIORITY */}
                <p className="priority">

                  Priority:
                  {task.priority}

                </p>

                {/* DATE */}
                <p className="date">

                  Due:
                  {task.dueDate}

                </p>


                {/* BUTTONS */}
                <div className="btn-group">

                  <button
                    className="complete-btn"
                    onClick={() =>
                      completeTask(
                        task._id,
                        task.status
                      )
                    }
                  >

                    {task.status ===
                    "Completed"
                      ? "Undo"
                      : "Complete"}

                  </button>

                  {editingId ===
                  task._id ? (

                    <button
                      className="edit-btn"
                      onClick={() =>
                        saveEdit(
                          task._id
                        )
                      }
                    >

                      Save

                    </button>

                  ) : (

                    <button
                      className="edit-btn"
                      onClick={() =>
                        startEdit(
                          task._id,
                          task.title
                        )
                      }
                    >

                      Edit

                    </button>

                  )}

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteTask(
                        task._id
                      )
                    }
                  >

                    Delete

                  </button>

                </div>

              </motion.div>
            )
          )
        )}

      </div>

    </div>
  );
}

export default Tasks;

