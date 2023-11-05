"use server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { revalidatePath } from "next/cache";

const FETCH_TASKS_SQL = "SELECT * FROM tasks";
const FETCH_NEW_TASK_SQL =
  "INSERT INTO tasks(title, content, type, show) Values(?,?,?,?)";
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
