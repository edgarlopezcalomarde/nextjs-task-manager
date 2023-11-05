import { EditIcon } from "@/lib/icons";
import { Task } from "@/models/task";
import React from "react";
import TaskCardContent from "./TaskCardContent";
import {
  SHOW_BOTH_TYPE,
  SHOW_DESC_TYPE,
  SHOW_TITLE_TYPE,
} from "@/lib/definitions";
import DeleteTask from "./DeleteTask";
import Link from "next/link";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task: { content, id, show, title, type } }: TaskCardProps) {
  return (
    <li className="transition border border-neutral-700 bg-neutral-800 rounded flex gap-2 items-center p-3 w-full text-neutral-400 hover:text-neutral-300 hover:border-neutral-500 ">
      <div className="flex  flex-col gap-2 w-full">
        {(show === SHOW_BOTH_TYPE || show === SHOW_TITLE_TYPE) && (
          <p className="font-medium">{title}</p>
        )}

        {(show === SHOW_BOTH_TYPE || show === SHOW_DESC_TYPE) && (
          <TaskCardContent content={content} type={type} />
        )}
      </div>

      <div className="mb-auto ml-auto flex gap-1">
        <Link href={`/edit/${id}`}>
          <EditIcon cls="transition hover:scale-110 cursor-pointer" />
        </Link>

        <DeleteTask id={id} />
      </div>
    </li>
  );
}

export default TaskCard;
