
"use client";
import PeopleTable from "./table/page";

export default function PeoplePage({ fetchUsers }: { fetchUsers: () => void; }) {
  return <PeopleTable />;
}