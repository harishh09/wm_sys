import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

import { io } from "socket.io-client";

const Dashboard = () => {
  const projects =
    useSelector(
      (state) =>
        state.projects
          ?.projects || []
    );

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  useEffect(() => {
    const socket =
      io(
        "http://localhost:5000"
      );

    socket.on(
      "notify",
      (msg) => {
        setNotifications(
          (
            prev
          ) => [
            msg,
            ...prev.slice(
              0,
              4
            ),
          ]
        );
      }
    );

    return () =>
      socket.disconnect();
  }, []);

  const totalProjects =
    projects.length;

  const allTasks =
    projects.flatMap(
      (p) =>
        p.tasks ||
        []
    );

  const totalTasks =
    allTasks.length;

  const completedTasks =
    allTasks.filter(
      (t) =>
        t.status ===
        "done"
    ).length;

  const pendingTasks =
    totalTasks -
    completedTasks;

  const pieData = [
    {
      name: "Completed",
      value:
        completedTasks,
    },
    {
      name: "Pending",
      value:
        pendingTasks,
    },
  ];

  const barData = projects.map((p) => ({
  name:
    p.name.length > 15
      ? p.name.slice(0, 15) + "..."
      : p.name,

  tasks: p.tasks?.length || 0,
}));

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  const exportCSV =
    () => {
      const rows =
        [
          [
            "Project",
            "Tasks",
          ],
          ...projects.map(
            (
              p
            ) => [
              p.name,
              p.tasks
                ?.length ||
                0,
            ]
          ),
        ];

      const csv =
        rows
          .map(
            (
              r
            ) =>
              r.join(
                ","
              )
          )
          .join(
            "\n"
          );

      const blob =
        new Blob(
          [csv],
          {
            type: "text/csv",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const a =
        document.createElement(
          "a"
        );

      a.href =
        url;
      a.download =
        "report.csv";
      a.click();
    };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Dashboard 📊
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          {
            label:
              "Projects",
            value:
              totalProjects,
          },
          {
            label:
              "Tasks",
            value:
              totalTasks,
          },
          {
            label:
              "Completed",
            value:
              completedTasks,
          },
          {
            label:
              "Pending",
            value:
              pendingTasks,
          },
        ].map(
          (
            item,
            i
          ) => (
            <div
              key={
                i
              }
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded shadow"
            >
              <h2>
                {
                  item.label
                }
              </h2>

              <p className="text-xl font-bold">
                {
                  item.value
                }
              </p>
            </div>
          )
        )}
      </div>

      {/* Export */}
      <button
        onClick={
          exportCSV
        }
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Download Report
      </button>

      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-3 text-gray-900 dark:text-white">
          Notifications 🔔
        </h2>

        {notifications.length ===
        0 ? (
          <p className="text-gray-500">
            No notifications
          </p>
        ) : (
          notifications.map(
            (
              item,
              i
            ) => (
              <div
                key={
                  i
                }
                className="p-2 mb-2 rounded bg-blue-100 text-blue-900"
              >
                {
                  item
                }
              </div>
            )
          )
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-gray-900 dark:text-white">
            Task Status
          </h2>

          <PieChart
            width={
              300
            }
            height={
              300
            }
          >
            <Pie
              data={
                pieData
              }
              dataKey="value"
              outerRadius={
                100
              }
              label
            >
              {pieData.map(
                (
                  e,
                  i
                ) => (
                  <Cell
                    key={
                      i
                    }
                    fill={
                      COLORS[
                        i
                      ]
                    }
                  />
                )
              )}
            </Pie>
          </PieChart>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-gray-900 dark:text-white">
            Tasks by Project
          </h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
  <h2 className="font-bold mb-4 text-gray-900 dark:text-white">
    Tasks by Project
  </h2>

  <div className="w-full h-[320px]">
    <ResponsiveContainer width="100%" height="100%">
          <BarChart
      data={barData}
      margin={{
        top: 20,
        right: 40,
        left: 0,
        bottom: 80,
      }}
      barCategoryGap="25%"
    >
      <XAxis
        dataKey="name"
        angle={-20}
        textAnchor="end"
        interval={0}
        height={80}
        tick={{
          fill: "#9ca3af",
          fontSize: 12,
        }}
      />

      <YAxis
        tick={{
          fill: "#9ca3af",
        }}
      />

      <Tooltip />

      <Bar
        dataKey="tasks"
        fill="#3b82f6"
        radius={[6, 6, 0, 0]}
        maxBarSize={80}
      />
    </BarChart>
        </ResponsiveContainer>
  </div>
</div>
        </div>
      </div>

      {/* Activity */}
      <div>
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          Recent Activity
        </h2>

        {projects
          .slice(-5)
          .map(
            (p) => (
              <div
                key={
                  p.id
                }
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 mb-2 rounded shadow"
              >
                Project created:{" "}
                {
                  p.name
                }
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Dashboard;