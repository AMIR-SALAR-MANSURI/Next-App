import React, { use } from "react";
import { sort } from "fast-sort";
import Link from "next/link";
interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}
export default async function UserTable({ sortOrder }: Props) {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: User[] = await res.json();

  const sorted = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              <Link href={"/users?sortOrder=name"}>Name</Link>
            </th>
            <th>
              <Link href={"/users?sortOrder=email"}>Email</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
