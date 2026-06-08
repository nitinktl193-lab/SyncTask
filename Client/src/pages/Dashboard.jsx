
import "./Dashboard.css";

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaChartPie,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import {
  useState,
  useEffect
} from "react";

import { toast } from "react-toastify";

function Dashboard() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // ================= LOAD TASKS =================
  useEffect(() => {

    const token =
      localStorage.getItem("token");

    // NO TOKEN
    if (!token) {

      navigate("/login");

      return;
    }

    fetch(
      "http://localhost:5000/api/tasks",
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

        } else {

          setTasks([]);
        }

        setLoading(false);

      })

      .catch((err) => {

        console.log(err);

        setLoading(false);

        toast.error(
          "Failed To Load Tasks"
        );

      });

  }, [navigate]);


  // ================= COUNTS =================
  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Pending"
    ).length;


  // ================= CHART DATA =================
  const data = [
    {
      day: "Mon",
      tasks: 4,
    },
    {
      day: "Tue",
      tasks: 7,
    },
    {
      day: "Wed",
      tasks: 5,
    },
    {
      day: "Thu",
      tasks: 9,
    },
    {
      day: "Fri",
      tasks: 6,
    },
    {
      day: "Sat",
      tasks: 8,
    },
  ];


  // ================= LOGOUT =================
  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    toast.success(
      "Logout Successful"
    );

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  };


  return (

    <div className="dashboard-page">

      {/* MOBILE MENU */}
      <button
        className="menu-btn"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >

        <FaBars />

      </button>


      {/* SIDEBAR */}
      <div
        className={
          menuOpen
            ? "sidebar active"
            : "sidebar"
        }
      >

        <h1 className="logo">

          SyncTask

        </h1>

        <ul>

          <li className="active">

            <FaChartPie />

            Dashboard

          </li>

          <Link
            to="/tasks"
            className="sidebar-link"
          >

            <li>

              <FaTasks />

              Tasks

            </li>

          </Link>

          <Link
            to="/team"
            className="sidebar-link"
          >

            <li>

              <FaUsers />

              Team

            </li>

          </Link>

        </ul>

        <button
          className="logout-btn"
          onClick={logout}
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>


      {/* MAIN */}
      <div className="dashboard-main">

        {/* TOPBAR */}
        <div className="topbar">

          <div>

            <h1>

              Welcome Back 👋

            </h1>

            <p>

              Manage your workflow
              efficiently.

            </p>

          </div>

          <button>

            This Week

          </button>

        </div>


        {/* STATS */}
        <div className="stats-grid">

          <div className="stats-card">

            <div>

              <p>Total Tasks</p>

              <h2>
                {totalTasks}
              </h2>

            </div>

            <FaTasks className="icon" />

          </div>


          <div className="stats-card">

            <div>

              <p>Completed</p>

              <h2>
                {completedTasks}
              </h2>

            </div>

            <FaCheckCircle className="icon green" />

          </div>


          <div className="stats-card">

            <div>

              <p>Pending</p>

              <h2>
                {pendingTasks}
              </h2>

            </div>

            <FaClock className="icon orange" />

          </div>

        </div>


        {/* CHART */}
        <div className="chart-box">

          <div className="chart-top">

            <h2>

              Productivity Analytics

            </h2>

          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart data={data}>

              <XAxis
                dataKey="day"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="tasks"
                radius={[
                  10,
                  10,
                  0,
                  0
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        {/* RECENT TASKS */}
        <div className="recent-box">

          <h2>

            Recent Tasks

          </h2>

          {loading ? (

            <p className="no-task">

              Loading...

            </p>

          ) : tasks.length === 0 ? (

            <p className="no-task">

              No Tasks Available

            </p>

          ) : (

            tasks
              .slice(0, 3)
              .map((task) => (

                <div
                  key={task._id}
                  className="recent-task"
                >

                  <div>

                    <span>

                      {task.title}

                    </span>

                    <small>

                      {task.priority}

                    </small>

                  </div>

                  <p
                    className={
                      task.status ===
                      "Completed"
                        ? "done"
                        : "pending"
                    }
                  >

                    {task.status}

                  </p>

                </div>
              ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;

