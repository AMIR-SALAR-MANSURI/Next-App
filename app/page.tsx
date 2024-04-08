import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import UserTable from "./users/UserTable";

interface Props {
  searchParams: { sortOrder: string };
}
export default function Home({ searchParams: { sortOrder } }: Props) {
  return (
    <main>
      <h1>hello world</h1>
      <Link href="/users">users</Link>
      <ProductCard />
      <UserTable sortOrder={sortOrder} />
    </main>
  );
}
