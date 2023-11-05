"use client";

import {
  DESC_TYPE,
  SHOW_BOTH_TYPE,
  SHOW_DESC_TYPE,
  SHOW_TITLE_TYPE,
} from "@/lib/definitions";
import { AddIcon, TrashIcon } from "@/lib/icons";
import { ChangeEvent, useState } from "react";
import TaskCardContent from "./TaskCardContent";
import { Task } from "@/models/task";

function UpdateTask({task}:{task:Task}) {
  const [type, setType] = useState("1");
  const [show, setShow] = useState("1");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState<
    Array<{ item: string; key: string }>
  >([]);
  const [item, setItem] = useState({ value: "", key: "" });

  function handleSelectType(e: ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value);
    setContent("");
    setContentList([]);
  }

  function handleSelectShow(e: ChangeEvent<HTMLSelectElement>) {
    setShow(e.target.value);
  }

  function handleAddItem() {
    setContentList((list) => [
      ...list,
      { item: item.value, key: crypto.randomUUID() },
    ]);
    setItem({ value: "", key: "" });
    setContent(
      contentList
        .map((it) => Object.values(it)[0])
        .flat()
        .join(";")
    );
  }

  function handleRemoveItem(key: string) {
    const newContentItems = contentList.filter((e) => e.key !== key);
    setContentList([...newContentItems]);
    setContent(
      contentList
        .map((it) => Object.values(it)[0])
        .flat()
        .join(";")
    );
  }

  return (
    <form className="flex flex-col gap-2  mt-10 w-full px-4 h-full">
      <label className="flex flex-col gap-1">
        <span className="font-medium">Title:</span>
        <input
          type="text"
          className="bg-background outline-none rounded-lg border-neutral-700 px-2 py-2 w-full border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-medium">Type:</span>
        <select
          name="type"
          id="type"
          className="bg-background outline-none rounded-lg border-neutral-700 px-2 py-2 w-full border"
          value={type}
          onChange={handleSelectType}
        >
          <option value="1">Description</option>
          <option value="2">List</option>
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-medium"> Content:</span>

        {type === DESC_TYPE ? (
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            className="bg-background outline-none rounded-lg border-neutral-700 px-2 py-2 w-full border"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        ) : (
          <>
            <ul className="list-disc  list-inside w-full rounded border-neutral-700 pl-2 flex flex-col gap-1 max-h-[200px] overflow-auto">
              {contentList.map((el) => {
                return (
                  <li
                    key={crypto.randomUUID()}
                    className="flex justify-between"
                  >
                    • {el.item}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(el.key)}
                    ></button>
                  </li>
                );
              })}
            </ul>

            <div className="flex gap-2">
              <input
                type="text"
                className="bg-background outline-none rounded-lg border-neutral-700 px-2 py-2 w-full border"
                value={item.value}
                onChange={(e) => setItem({ value: e.target.value, key: "" })}
              />
              <button
                type="button"
                onClick={handleAddItem}
                disabled={item.value.length < 1}
              >
                <AddIcon />
              </button>
            </div>
          </>
        )}
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-medium">Show:</span>
        <select
          name="show"
          id="show"
          className="bg-background outline-none rounded-lg border-neutral-700 px-2 py-2 w-full border"
          value={show}
          onChange={handleSelectShow}
        >
          <option value="1">Title</option>
          <option value="2">Content</option>
          <option value="3">Both</option>
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="font-medium">Preview:</span>

        <div className="transition border border-neutral-700 bg-neutral-800 rounded flex gap-2 items-center p-3 w-full text-neutral-400 hover:text-neutral-300 hover:border-neutral-500 ">
          <div className="flex  flex-col gap-2 w-full">
            {(show === SHOW_BOTH_TYPE || show === SHOW_TITLE_TYPE) && (
              <p className="font-medium">{title}</p>
            )}

            {(show === SHOW_BOTH_TYPE || show === SHOW_DESC_TYPE) && (
              <TaskCardContent content={content} type={type} />
            )}
          </div>
        </div>
      </label>

      <button
        type="submit"
        className=" mt-auto inline-flex items-center justify-center rounded-md text-sm font-medium shadow bg-background  px-4 py-4"
      >
        Update
      </button>
    </form>
  );
}

export default UpdateTask;
