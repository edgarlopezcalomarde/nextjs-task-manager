import {  LIST_TYPE } from "@/lib/definitions";

function TaskCardContent({ type, content }: { type: string; content: string }) {
  if (type === LIST_TYPE) {
    const list = content.split(";");
    return (
      <ul className="border list-disc  list-inside p-2 bg-neutral-900 w-full rounded border-neutral-700">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p>{content}</p>;
}

export default TaskCardContent;
