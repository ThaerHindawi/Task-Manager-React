import useSWR, { mutate } from "swr";
import API_BASE_URL from "../utils/API_URL";
import { useRef, useState } from "react";
import type { ITask } from "../interfaces/ITask";
import {
  getTasks,
  updateTask,
  createTask,
  deleteTask as apiDeleteTask,
} from "../utils/api";
import Task from "./Task";

function Tasks() {
  const { data: tasks, isLoading } = useSWR(
    API_BASE_URL("/tasks/"),
    fetchTasksHandler,
    {
      revalidateOnFocus: false,
    }
  );
  const modal = useRef<HTMLDialogElement>(null);
  const updateModal = useRef<HTMLDialogElement>(null);
  const addModal = useRef<HTMLDialogElement>(null);

  async function fetchTasksHandler() {
    const res: ITask[] = await getTasks();
    return res;
  }
  const [taskModal, setTaskModal] = useState<ITask>();
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    is_completed: number;
  }>({
    title: "",
    description: "",
    is_completed: 0,
  });

  function showModal(task: ITask) {
    setTaskModal(task);
    modal.current?.showModal();
  }

  async function deleteTask(id: string) {
    await apiDeleteTask(Number(id));
    mutate(API_BASE_URL("/tasks/"));
  }

  async function updateTaskModal(task: ITask) {
    setTaskModal(task);
    updateModal.current?.showModal();
  }

  function showAddModal() {
    setNewTask({
      title: "",
      description: "",
      is_completed: 0,
    });
    addModal.current?.showModal();
  }

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    await createTask(newTask);
    addModal.current?.close();
    mutate(API_BASE_URL("/tasks/"));
  }

  return (
    <section className="mx-auto max-w-7xl py-14">
      <div className="my-6">
        <h1 className="text-center text-4xl">Tasks Manager</h1>
        <h2 className="text-center">
          Created By{" "}
          <a
            href="https://thaerhendawi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thaer Hendawi
          </a>
        </h2>
      </div>
      <div className="text-center my-4">
        <button
          onClick={showAddModal}
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Add New Task
        </button>
      </div>
      {isLoading ? (
        <div className="relative h-screen w-screen">
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-1 w-full">
          {tasks
            ?.slice()
            .reverse()
            .map((task) => (
              <Task
                key={task.id}
                task={task}
                showModal={showModal}
                updateTask={updateTaskModal}
              />
            ))}
        </div>
      )}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={modal} id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">{taskModal?.title}</h3>
          {/* <div className="">
            <p className="text-sm">Created at: {new Date(taskModal?.created_at || "").toLocaleString()}</p>
            <p className="text-sm">Updated at: {new Date(taskModal?.updated_at || "").toLocaleString()}</p>
        </div> */}
          <p className="py-4 break-words">{taskModal?.description}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
              <button
                onClick={() => deleteTask(taskModal?.id + "")}
                className="btn btn-error ml-4"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog ref={updateModal} id="update_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Edit Task</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (taskModal) {
                await updateTask(taskModal.id, {
                  title: taskModal.title,
                  description: taskModal.description,
                  is_completed: taskModal.is_completed,
                });
                updateModal.current?.close();
                mutate(API_BASE_URL("/tasks/"));
              }
            }}
            className="py-4"
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={taskModal?.title || ""}
                onChange={(e) =>
                  setTaskModal((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev
                  )
                }
                required
                className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={taskModal?.description || ""}
                onChange={(e) =>
                  setTaskModal((prev) =>
                    prev ? { ...prev, description: e.target.value } : prev
                  )
                }
                rows={4}
                className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              />
            </div>

            <div className="relative flex items-start mb-4">
              <div className="flex items-center h-5">
                <input
                  id="is_completed"
                  type="checkbox"
                  checked={!!taskModal?.is_completed}
                  onChange={(e) =>
                    setTaskModal((prev) =>
                      prev
                        ? { ...prev, is_completed: e.target.checked ? 1 : 0 }
                        : prev
                    )
                  }
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="is_completed"
                  className="font-medium text-gray-700"
                >
                  Completed
                </label>
              </div>
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={() => updateModal.current?.close()}
                className="btn"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary ml-4">
                Save
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog ref={addModal} id="add_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Add Task</h3>
          <form onSubmit={handleAddTask} className="py-4">
            <div className="mb-4">
              <label
                htmlFor="new-title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="new-title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
                required
                className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="new-description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="new-description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
                className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
              />
            </div>

            <div className="relative flex items-start mb-4">
              <div className="flex items-center h-5">
                <input
                  id="new-is-completed"
                  type="checkbox"
                  checked={!!newTask.is_completed}
                  onChange={(e) =>
                    setNewTask((prev) => ({
                      ...prev,
                      is_completed: e.target.checked ? 1 : 0,
                    }))
                  }
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="new-is-completed"
                  className="font-medium text-gray-700"
                >
                  Completed
                </label>
              </div>
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={() => addModal.current?.close()}
                className="btn"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary ml-4">
                Save
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </section>
  );
}

export default Tasks;
