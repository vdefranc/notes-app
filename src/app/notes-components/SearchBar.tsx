"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TextInput } from "@mantine/core";
import pageStyles from "@/app/page.module.css";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div className={pageStyles["notes-column"]}>
      <TextInput
        name="title"
        label="Search your notes"
        description="You can filter your notes by the content of their title and content."
        placeholder={"search for notes..."}
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          const newParams = new URLSearchParams(searchParams);
          const searchTerm = e.target.value;

          if (searchTerm) {
            newParams.set("query", e.target.value);
          } else {
            newParams.delete("query");
          }

          router.replace(`${pathname}?${newParams.toString()}`);
        }}
      />
    </div>
  );
}
