"use server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { revalidatePath } from "next/cache";
import { Task } from "@/models/task";
import { MESSAGE_OK } from "@/lib/definitions";

const FETCH_TASKS_SQL = "SELECT * FROM tasks";
const FETCH_TASK_BY_ID_SQL = "SELECT * FROM tasks WHERE id = ?";
const FETCH_NEW_TASK_SQL =
  "INSERT INTO tasks(title, content, type, show) Values(?,?,?,?)";
const FETCH_UPDATE_TASK_SQL =
  "UPDATE tasks SET title = ?, content =?, type=?, show=? WHERE id=?";
const FETCH_DELETE_TASK_SQL = "DELETE FROM tasks WHERE id = ?";

export async function getTasks() {
  try {
    const db = await open({
      filename: "./taskmangment.db",
      driver: sqlite3.Database,
    });

    const tasks = await db.all(FETCH_TASKS_SQL);
    return tasks;
  } catch (err) {
    console.log(err);
  }
}

export async function getTasksById(id: string) {
  try {
    const db = await open({
      filename: "./taskmangment.db",
      driver: sqlite3.Database,
    });

    const task: Task | undefined = await db.get(FETCH_TASK_BY_ID_SQL, [id]);
    return task;
  } catch (err) {
    console.log(err);
  }
}

export async function insertNewTask(prevState: any, formData: FormData) {
  try {
    const db = await open({
      filename: "./taskmangment.db",
      driver: sqlite3.Database,
    });

    const newTask = await db.run(FETCH_NEW_TASK_SQL, [
      formData.get("title"),
      "",
      "1",
      "1",
    ]);

    revalidatePath("/");
  } catch (err) {
    console.log(err);
  }
}

export async function updateTask(prevState: any, formData: FormData) {
  try {
    const db = await open({
      filename: "./taskmangment.db",
      driver: sqlite3.Database,
    });

    await db.run(FETCH_UPDATE_TASK_SQL, [
      formData.get("title"),
      formData.get("content"),
      formData.get("type"),
      formData.get("show"),
      formData.get("id"),
    ]);

    revalidatePath("/");
    return { message: MESSAGE_OK };
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTask(prevState: any, formData: FormData) {
  try {
    const db = await open({
      filename: "./taskmangment.db",
      driver: sqlite3.Database,
    });

    await db.run(FETCH_DELETE_TASK_SQL, formData.get("id"));
    revalidatePath("/");
  } catch (err) {
    console.log(err);
  }
}
