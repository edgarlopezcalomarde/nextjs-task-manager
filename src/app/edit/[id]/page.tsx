import UpdateTask from "@/components/UpdateTask";
import { BackIcon } from "@/lib/icons";
import Link from "next/link";

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="transition border border-neutral-700 bg-neutral-800 rounded flex flex-col gap-2 items-center p-3 w-full text-neutral-400 h-full relative">
      <Link href="/" className=" absolute left-0 top-0 p-4">
        <BackIcon />
      </Link>

        <UpdateTask />
    </div>
  );
}
