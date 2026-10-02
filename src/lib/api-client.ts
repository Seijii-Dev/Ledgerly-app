import { ApiResult, RemoteAccount, RemoteExpense } from "@/types/api";
import { API_BASE_URL } from "@/config";

export type { ApiResult, RemoteAccount, RemoteExpense };

// The API URL is public and bundled into the Android app.
const API_URL = API_BASE_URL

async function request<T>(
  path: string,
  options: { method?: string; token?: string | null; body?: unknown } = {}
): Promise<ApiResult<T>> {
  if (!API_URL) {
    return { ok: false, message: "The app isn't configured with a server address yet." };
  }
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
    const text = await response.text().catch(() => "");
    let data: Record<string, unknown> | null = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }
    } else {
      data = {};
    }

    if (!response.ok) {
      return { ok: false, message: (data?.message as string) ?? "Something went wrong. Please try again." };
    }
    if (data && data.ok === false) {
      return { ok: false, message: (data.message as string) ?? "Something went wrong. Please try again." };
    }
    return { ok: true, ...(data || {}) } as ApiResult<T>;
  } catch {
    return { ok: false, message: "Couldn't reach the server. Check your connection and try again." };
  }
}

export const api = {
  register: (name: string, email: string, password: string) =>
    request<{ token: string; account: RemoteAccount }>("/api/auth/register", {
      method: "POST",
      body: { name, email, password },
    }),

  login: (email: string, password: string) =>
    request<{ token: string; account: RemoteAccount }>("/api/auth/login", {
      method: "POST",
      body: { email, password },
    }),
  googleLogin: (idToken: string) =>
    request<{ token: string; refreshToken?: string; account: RemoteAccount }>("/api/auth/google", {
      method: "POST",
      body: { idToken },
    }),

  me: (token: string) => request<{ account: RemoteAccount }>("/api/auth/me", { token }),

  listExpenses: (token: string) => request<{ expenses: RemoteExpense[] }>("/api/expenses", { token }),

  createExpense: (token: string, expense: Omit<RemoteExpense, "id">) =>
    request<{ expense: RemoteExpense }>("/api/expenses", { method: "POST", token, body: expense }),

  updateExpense: (token: string, id: string, expense: Omit<RemoteExpense, "id">) =>
    request<{ expense: RemoteExpense }>(`/api/expenses/${id}`, { method: "PUT", token, body: expense }),

  deleteExpense: (token: string, id: string) => request<{}>(`/api/expenses/${id}`, { method: "DELETE", token }),

  updateBudget: (token: string, budget: number) =>
    request<{ budget: number }>("/api/budget", { method: "PUT", token, body: { budget } }),
};
