import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  addTask,
  updateTaskStatus,
  addComment,
  addAttachment,
} from "../features/projectsSlice";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import { toast } from "react-toastify";

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const project = useSelector((state) =>
    state.projects.projects.find(
      (p) => p.id === Number(id)
    )
  );

  const users = useSelector(
    (state) => state.users?.users || []
  );

  const [taskName, setTaskName] =
    useState("");

  const [assignedTo, setAssignedTo] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [dueDate, setDueDate] =
    useState("");

  const [commentText, setCommentText] =
    useState({});

  if (!project)
    return <p>Project not found</p>;

  const columns = {
    pending: project.tasks.filter(
      (t) => t.status === "pending"
    ),
    progress: project.tasks.filter(
      (t) => t.status === "progress"
    ),
    done: project.tasks.filter(
      (t) => t.status === "done"
    ),
  };

  const titles = {
    pending: "Pending",
    progress: "In Progress",
    done: "Done",
  };

  const handleAddTask = () => {
    if (!taskName.trim()) return;

    dispatch(
      addTask({
        projectId: project.id,
        task: {
          id: Date.now(),
          title: taskName,
          assignedTo,
          priority,
          dueDate,
          status: "pending",
        },
      })
    );

    toast.success("Task assigned");

    setTaskName("");
    setAssignedTo("");
    setPriority("Medium");
    setDueDate("");
  };

  const handleComment = (taskId) => {
    if (!commentText[taskId]?.trim()) return;

    dispatch(
      addComment({
        projectId: project.id,
        taskId,
        comment:
          commentText[taskId],
      })
    );

    toast.success(
      "Comment added"
    );

    setCommentText({
      ...commentText,
      [taskId]: "",
    });
  };

  const handleFile = (
    e,
    taskId
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    dispatch(
      addAttachment({
        projectId: project.id,
        taskId,
        fileName:
          file.name,
      })
    );

    toast.success(
      "Attachment added"
    );
  };

  const onDragEnd = (
    result
  ) => {
    if (
      !result.destination
    )
      return;

    dispatch(
      updateTaskStatus({
        projectId:
          project.id,
        taskId: Number(
          result.draggableId
        ),
        newStatus:
          result
            .destination
            .droppableId,
      })
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {project.name}
      </h1>

      {/* Add Task */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6 grid grid-cols-4 gap-3">
        <input
          value={taskName}
          onChange={(e) =>
            setTaskName(
              e.target.value
            )
          }
          placeholder="Task name"
          className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <select
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(
              e.target.value
            )
          }
          className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          <option value="">
            Assign User
          </option>

          {users.map((u) => (
            <option
              key={u.id}
              value={u.name}
            >
              {u.name}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value
            )
          }
          className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
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
          className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <button
          onClick={
            handleAddTask
          }
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-4"
        >
          Assign Task
        </button>
      </div>

      {/* Kanban */}
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(
            columns
          ).map(
            (status) => (
              <Droppable
                droppableId={
                  status
                }
                key={
                  status
                }
              >
                {(provided) => (
                  <div
                    ref={
                      provided.innerRef
                    }
                    {...provided.droppableProps}
                    className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 min-h-[450px]"
                  >
                    <h2 className="font-bold mb-4 text-lg text-gray-900 dark:text-white">
                      {
                        titles[
                          status
                        ]
                      }
                    </h2>

                    {columns[
                      status
                    ].map(
                      (
                        task,
                        index
                      ) => (
                        <Draggable
                          key={
                            task.id
                          }
                          draggableId={String(
                            task.id
                          )}
                          index={
                            index
                          }
                        >
                          {(
                            provided
                          ) => (
                            <div
                              ref={
                                provided.innerRef
                              }
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow mb-3"
                            >
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {
                                  task.title
                                }
                              </h3>

                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Assigned:{" "}
                                {task.assignedTo ||
                                  "Unassigned"}
                              </p>

                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Priority:{" "}
                                {
                                  task.priority
                                }
                              </p>

                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Due:{" "}
                                {task.dueDate ||
                                  "N/A"}
                              </p>

                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                File:{" "}
                                {task.attachment ||
                                  "None"}
                              </p>

                              <input
                                type="file"
                                onChange={(
                                  e
                                ) =>
                                  handleFile(
                                    e,
                                    task.id
                                  )
                                }
                                className="text-sm mt-2"
                              />

                              {/* Comments */}
                              <div className="mt-3">
                                <input
                                  value={
                                    commentText[
                                      task.id
                                    ] ||
                                    ""
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    setCommentText(
                                      {
                                        ...commentText,
                                        [task.id]:
                                          e
                                            .target
                                            .value,
                                      }
                                    )
                                  }
                                  placeholder="Add comment"
                                  className="w-full border p-2 rounded text-black"
                                />

                                <button
                                  onClick={() =>
                                    handleComment(
                                      task.id
                                    )
                                  }
                                  className="bg-green-600 text-white px-3 py-1 rounded mt-2"
                                >
                                  Add Comment
                                </button>

                                {task.comments
                                  ?.length >
                                  0 && (
                                  <div className="mt-2 space-y-1">
                                    {task.comments.map(
                                      (
                                        c,
                                        i
                                      ) => (
                                        <p
                                          key={
                                            i
                                          }
                                          className="text-xs bg-gray-200 dark:bg-gray-600 p-2 rounded"
                                        >
                                          {c}
                                        </p>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      )
                    )}

                    {
                      provided.placeholder
                    }
                  </div>
                )}
              </Droppable>
            )
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ProjectDetails;