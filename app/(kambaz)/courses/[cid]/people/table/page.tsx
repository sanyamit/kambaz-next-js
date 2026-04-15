"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as coursesClient from "../../../client";
import PeopleTable from "./PeopleTable";

export default function CoursePeopleTablePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = useCallback(async () => {
    if (!cid) return;
    const list = await coursesClient.findUsersForCourse(cid as string);
    setUsers(Array.isArray(list) ? list : []);
  }, [cid]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
