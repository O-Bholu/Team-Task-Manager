import api from "./api";

export const getTasksByProjectApi = async (projectId) => {
  const { data } = await api.get(`/tasks/project/${projectId}`);
  return data;
};

export const createTaskApi = async (payload) => {
  const { data } = await api.post("/tasks", payload);
  return data;
};

export const updateTaskStatusApi = async (taskId, status) => {
  const { data } = await api.put(`/tasks/${taskId}`, null, {
    params: { status },
  });
  return data;
};

export const getDashboardApi = async () => {
  const { data } = await api.get("/tasks/dashboard");
  return data;
};
