import axios from "axios";
import type { ITask } from "../interfaces/ITask";
import API_BASE_URL from "./API_URL";


const TASKS_URL = `${API_BASE_URL("tasks")}`;

export const getTasks = async (): Promise<ITask[]> => {
  const res = await axios.get(TASKS_URL);
  return res.data;
};

export const getTask = async (id: number): Promise<ITask> => {
  const res = await axios.get(`${TASKS_URL}/${id}`);
  return res.data;
};

export const createTask = async (
  task: Omit<ITask, "id" | "created_at" | "updated_at">
): Promise<ITask> => {
  const res = await axios.post(TASKS_URL, task);
  return res.data;
};

export const updateTask = async (
  id: number,
  task: Partial<Omit<ITask, "id" | "created_at" | "updated_at">>
): Promise<ITask> => {
  const res = await axios.put(`${TASKS_URL}/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${TASKS_URL}/${id}`);
};
