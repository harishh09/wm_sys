import { useState } from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  addProject,
  updateProject,
  deleteProject,
} from "../features/projectsSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Projects = () => {
  const projects =
    useSelector(
      (state) =>
        state.projects.projects
    );

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const [name, setName] =
    useState("");

  const [desc, setDesc] =
    useState("");

  const [
    editingProject,
    setEditingProject,
  ] = useState(null);

  // Save / Update
  const handleSave =
    () => {
      if (
        !name.trim()
      )
        return;

      if (
        editingProject
      ) {
        dispatch(
          updateProject({
            id: editingProject.id,
            name,
            desc,
          })
        );

        toast.success(
          "Project updated"
        );
      } else {
        dispatch(
          addProject({
            id: Date.now(),
            name,
            desc,
          })
        );

        toast.success(
          "Project created"
        );
      }

      setShowModal(
        false
      );
      setName("");
      setDesc("");
      setEditingProject(
        null
      );
    };

  // Delete
  const handleDelete =
    (id) => {
      dispatch(
        deleteProject(id)
      );

      toast.success(
        "Project deleted"
      );
    };

  // Edit
  const handleEdit =
    (project) => {
      setEditingProject(
        project
      );

      setName(
        project.name
      );

      setDesc(
        project.desc
      );

      setShowModal(
        true
      );
    };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Projects 📁
      </h1>

      {/* Create */}
      <button
        onClick={() =>
          setShowModal(
            true
          )
        }
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
      >
        + Create Project
      </button>

      {/* List */}
      <div className="grid gap-4">
        {projects.length ===
          0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No projects yet.
          </p>
        )}

        {projects.map(
          (p) => (
            <div
              key={
                p.id
              }
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-5 rounded-xl shadow transition-colors duration-300"
            >
              <h3
                className="font-bold text-lg cursor-pointer hover:text-blue-500"
                onClick={() =>
                  navigate(
                    `/projects/${p.id}`
                  )
                }
              >
                {p.name}
              </h3>

              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {p.desc}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleEdit(
                      p
                    )
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      p.id
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {editingProject
                ? "Edit Project"
                : "New Project"}
            </h2>

            <input
              type="text"
              placeholder="Project Name"
              value={name}
              onChange={(
                e
              ) =>
                setName(
                  e.target
                    .value
                )
              }
              className="w-full border p-3 mb-4 rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />

            <textarea
              placeholder="Description"
              value={desc}
              onChange={(
                e
              ) =>
                setDesc(
                  e.target
                    .value
                )
              }
              className="w-full border p-3 mb-4 rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />

            <div className="flex gap-2">
              <button
                onClick={
                  handleSave
                }
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                {editingProject
                  ? "Update"
                  : "Save"}
              </button>

              <button
                onClick={() => {
                  setShowModal(
                    false
                  );
                  setEditingProject(
                    null
                  );
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;