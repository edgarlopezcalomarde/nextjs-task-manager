"use client";
import { TrashIcon } from "@/lib/icons";
import { deleteTask } from "@/services/task";
import { useFormState } from "react-dom";

const initialState = {
  message: null,
};

function DeleteTask({ id }: { id: number }) {
  const [state, formAction] = useFormState(deleteTask, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />

      <button type="submit">
        <TrashIcon cls="transition hover:scale-110 cursor-pointer" />
      </button>
    </form>
  );
}

export default DeleteTask;
