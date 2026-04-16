import api from "./api";

export interface Session {
  id: number;
  userId: number;
  startTime: string;
  endTime: string | null;
  createdAt: string;
}

export interface Stats {
  daily: number;
  weekly: number;
  monthly: number;
}

export const startSessionApi = async (): Promise<Session> => {
  const res = await api.post<Session>("/sessions/start");
  return res.data;
};

export const endSessionApi = async (): Promise<Session> => {
  const res = await api.post<Session>("/sessions/end");
  return res.data;
};

export const getActiveSessionApi = async (): Promise<Session | null> => {
  const res = await api.get<Session | null>("/sessions/active");
  return res.data;
};

export const getStatsApi = async (): Promise<Stats> => {
  const res = await api.get<Stats>("/sessions/stats");
  return res.data;
};
