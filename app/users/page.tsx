import Link from "next/link";
import React, { Suspense } from "react";
import UserTable from "./UserTable";

interface Props {
  searchParams: { sortOrder: string };
}

export default async function UserPage({ searchParams: { sortOrder } }: Props) {
  console.log(sortOrder);

  return (
    <>
      <h1>Users</h1>
      <Link href={"/users/new"} className="btn">
        New User
      </Link>
      <UserTable sortOrder={sortOrder} />
    </>
  );
}
