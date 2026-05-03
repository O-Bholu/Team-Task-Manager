import api from "./api";

export const getProjectsApi = async () => {
  const { data } = await api.get("/projects");
  return data;
};

export const createProjectApi = async (payload) => {
  const { data } = await api.post("/projects", payload);
  return data;
};

export const addProjectMemberApi = async (projectId, memberId) => {
  const { data } = await api.post(`/projects/${projectId}/members`, { memberId });
  return data;
};
