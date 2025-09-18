import { BACKEND_URL } from "./constants";

export const api = {
  async get<T = unknown>(url: string, accessToken?: string): Promise<T> {
    const endpoint = `${BACKEND_URL}/${url}`;
    const headers: Record<string, string> = {};
    if (accessToken) headers.authorization = `Bearer ${accessToken}`;
    const res = await fetch(endpoint, { headers });
    const data = await res.json();
    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(url: string, body: any, accessToken?: string) {
    const endpoint = `${BACKEND_URL}/${url}`;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (accessToken) headers.authorization = `Bearer ${accessToken}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async put(url: string, body: any, accessToken?: string) {
    const endpoint = `${BACKEND_URL}/${url}`;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (accessToken) headers.authorization = `Bearer ${accessToken}`;
    const res = await fetch(endpoint, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  },

  async delete(url: string, accessToken?: string) {
    const endpoint = `${BACKEND_URL}/${url}`;
    const headers: Record<string, string> = {};
    if (accessToken) headers.authorization = `Bearer ${accessToken}`;
    const res = await fetch(endpoint, { method: "DELETE", headers });
    const data = await res.json();
    return data;
  },
};
