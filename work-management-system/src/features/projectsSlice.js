import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const storedProjects =
  JSON.parse(
    localStorage.getItem("projects")
  ) || [];

const initialState = {
  projects: storedProjects,
};

const saveData = (projects) => {
  localStorage.setItem(
    "projects",
    JSON.stringify(projects)
  );
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,

  reducers: {
    // Add Project
    addProject: (state, action) => {
      state.projects.push({
        ...action.payload,
        tasks: [],
      });

      saveData(state.projects);
    },

    // Update Project
    updateProject: (state, action) => {
      state.projects =
        state.projects.map((p) =>
          p.id ===
          action.payload.id
            ? {
                ...p,
                ...action.payload,
              }
            : p
        );

      saveData(state.projects);
    },

    // Delete Project
    deleteProject: (state, action) => {
      state.projects =
        state.projects.filter(
          (p) =>
            p.id !==
            action.payload
        );

      saveData(state.projects);
    },

    // Add Task
    addTask: (state, action) => {
      const {
        projectId,
        task,
      } = action.payload;

      const project =
        state.projects.find(
          (p) =>
            p.id === projectId
        );

      if (project) {
        project.tasks.push({
          ...task,
          comments: [],
          attachment: "",
        });
      }

      saveData(state.projects);
    },

    // Update Task Status
    updateTaskStatus: (
      state,
      action
    ) => {
      const {
        projectId,
        taskId,
        newStatus,
      } = action.payload;

      const project =
        state.projects.find(
          (p) =>
            p.id === projectId
        );

      if (project) {
        const task =
          project.tasks.find(
            (t) =>
              t.id === taskId
          );

        if (task) {
          task.status =
            newStatus;
        }
      }

      saveData(state.projects);
    },

    // Add Comment
    addComment: (
      state,
      action
    ) => {
      const {
        projectId,
        taskId,
        comment,
      } = action.payload;

      const project =
        state.projects.find(
          (p) =>
            p.id === projectId
        );

      if (project) {
        const task =
          project.tasks.find(
            (t) =>
              t.id === taskId
          );

        if (task) {
          task.comments.push(
            comment
          );
        }
      }

      saveData(state.projects);
    },

    // Add Attachment
    addAttachment: (
      state,
      action
    ) => {
      const {
        projectId,
        taskId,
        fileName,
      } = action.payload;

      const project =
        state.projects.find(
          (p) =>
            p.id === projectId
        );

      if (project) {
        const task =
          project.tasks.find(
            (t) =>
              t.id === taskId
          );

        if (task) {
          task.attachment =
            fileName;
        }
      }

      saveData(state.projects);
    },
  },
});

export const {
  addProject,
  updateProject,
  deleteProject,
  addTask,
  updateTaskStatus,
  addComment,
  addAttachment,
} =
  projectsSlice.actions;

export default
  projectsSlice.reducer;