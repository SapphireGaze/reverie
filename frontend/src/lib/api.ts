import { ErrorMessage, Token, User } from "./types";

const host: string =
  process.env.NEXT_PUBLIC_API_HOST || "http://127.0.0.1:8000";

export const getTasks = async (): Promise<string[]> => {
  const response: Response = await fetch(`${host}/api/task`);

  if (!response.ok) {
    const error: ErrorMessage = await response.json();
    throw new Error(`Failed to fetch data: ${error.error}`);
  }

  const data: string[] = await response.json();

  return data;
};

export const getProfile = async (token: string) => {
  const response: Response = await fetch(`${host}/api/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error: ErrorMessage = await response.json();
    throw new Error(`Failed to fetch data: ${error.error}`);
  }

  const data = await response.json();

  return data;
};

export const login = async (
  username: string,
  password: string,
): Promise<string> => {
  const user: User = { username: username, password: password };

  const response: Response = await fetch(`${host}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error: ErrorMessage = await response.json();
    throw new Error(`Failed to fetch data: ${error.error}`);
  }

  const data: Token = await response.json();

  return data.token;
};

export const register = async (
  email: string,
  username: string,
  password: string,
): Promise<string> => {
  const user: User = { email: email, username: username, password: password };

  const response: Response = await fetch(`${host}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error: ErrorMessage = await response.json();
    throw new Error(`Failed to fetch data: ${error.error}`);
  }

  const data: Token = await response.json();

  return data.token;
};
