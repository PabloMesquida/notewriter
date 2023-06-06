import { Note } from "../models/note";
import { User } from "../models/user";

console.log("ENV", import.meta.env.VITE_SERVER_URL);

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const defaultInit: RequestInit = {
    credentials: "include", // Incluir las credenciales en la solicitud
  };

  const response = await fetch(input, { ...defaultInit, ...init });

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData(
    "https://notewriter-backend.vercel.app/api/users",
    { method: "GET" }
  );

  return response.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData(
    "https://notewriter-backend.vercel.app/api/users/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData(
    "https://notewriter-backend.vercel.app/api/users/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
}

export async function logout() {
  await fetchData("https://notewriter-backend.vercel.app/api/users/logout", {
    method: "POST",
  });
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData(
    "https://notewriter-backend.vercel.app/api/notes",
    { method: "GET" }
  );
  return response.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData(
    "https://notewriter-backend.vercel.app/api/notes",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    }
  );
  return response.json();
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(
    `https://notewriter-backend.vercel.app/api/notes/${noteId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    }
  );
  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(`https://notewriter-backend.vercel.app/api/notes/${noteId}`, {
    method: "DELETE",
  });
}
