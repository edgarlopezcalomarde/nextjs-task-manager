import CreateTask from "@/components/CreateTask";
import { EditIcon, TrashIcon } from "../lib/icons";
import { getTasks } from "@/services/task";
import TaskCard from "@/components/TaskCard";

export default async function Home() {
  const tasks = await getTasks();
  return (
    <>
      <ul className="transition-all p-4 flex flex-col gap-2 overflow-auto">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </ul>
      

      <CreateTask />
    </>
  );
}
