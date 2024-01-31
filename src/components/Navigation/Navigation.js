import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="flex justify-center">
      <Link
        href="/today"
        className="border border-black p-4 m-2 rounded-md w-32 h-20 flex items-center justify-center"
      >
        Today
      </Link>
      <Link
        href="/flagged"
        className="border border-black p-4 m-2 rounded-md w-32 h-20 flex items-center justify-center "
      >
        Flagged
      </Link>
      <Link
        href="/all"
        className="border border-black p-4 m-2 rounded-md w-32 h-20 flex items-center justify-center"
      >
        All
      </Link>
    </nav>
  );
}
