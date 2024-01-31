import Link from "next/link";
import { useRouter } from "next/router";

export default function NewButton() {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <Link
        href="/new"
        className="border border-black p-4 m-12 rounded-md w-32 h-8 flex items-center justify-center"
      >
        {" "}
        New To-Do
      </Link>
    </div>
  );
}
