import api from "./api";

export interface Session {
  id: number;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  createdAt: string;
}

export interface Stats {
  daily: number;
  weekly: number;
  monthly: number;
}

export const addEntryApi = async (
  date: string,
  startTime: string,
  endTime: string,
): Promise<Session> => {
  const res = await api.post<Session>("/sessions/entry", {
    date,
    startTime,
    endTime,
  });
  return res.data;
};

export const getEntriesApi = async (): Promise<Session[]> => {
  const res = await api.get<Session[]>("/sessions/entries");
  return res.data;
};

export const deleteEntryApi = async (id: number): Promise<void> => {
  await api.delete(`/sessions/entry/${id}`);
};

export const getStatsApi = async (): Promise<Stats> => {
  const res = await api.get<Stats>("/sessions/stats");
  return res.data;
};
