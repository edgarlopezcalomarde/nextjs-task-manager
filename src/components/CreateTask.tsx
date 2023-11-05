"use client";

import { useFormState, useFormStatus } from "react-dom";
import { AddIcon } from "../lib/icons";
import React from "react";
import { insertNewTask } from "@/services/task";

const initialState = {
  title: "",
};

function CreateTask() {
  const [state, formAction] = useFormState(insertNewTask, initialState);
  const { pending } = useFormStatus();

  return (
    <form
      action={formAction}
      className="flex py-1 sm:p-4 bg-background sm:border-b-0 sm:rounded  sm:rounded-bl-none sm:rounded-br-none border-neutral-700 text-white mt-auto sm:border border-t"
    >
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Write new task..."
        className=" bg-background outline-none rounded  border-neutral-700 px-10 py-5 w-full sm:border sm:border-r-0  rounded-tr-none rounded-br-none"
      />
      <button
        type="submit"
        className="sm:border border-neutral-700 sm:border-l-0 flex items-center p-4 rounded-tr rounded-br"
      >
        <AddIcon cls="cursor-pointer" />
      </button>
    </form>
  );
}

export default CreateTask;
