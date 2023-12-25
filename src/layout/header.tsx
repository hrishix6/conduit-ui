import { APP_NAME } from "@/constants";

export default function Header() {
  return (
    <header className="bg-primary h-40 text-white flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold">
            {APP_NAME}
        </h1>
        <h3 className="text-xl">
            A place to share your knowledge.
        </h3>
    </header>
  )
}
