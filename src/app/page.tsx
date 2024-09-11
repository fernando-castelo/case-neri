import { api, HydrateClient } from "~/trpc/server";
import TaskList from "./_components/task";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <TaskList />
        </div>
      </main>
    </HydrateClient>
  );
}
