import { APP_NAME } from "@/constants";
import { Layout } from "@/layout";

export default function HomePage() {
  return (
    <Layout>
        <header className="bg-primary h-40 text-white flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold">
            {APP_NAME}
        </h1>
        <h3 className="text-xl">
            A place to share your knowledge.
        </h3>
    </header>
    </Layout>
  )
}
