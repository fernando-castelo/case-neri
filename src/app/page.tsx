import { HydrateClient } from "~/trpc/server";
import TaskList from "./_components/tasklist";
import helpers from "~/lib/trcp";

// export async function getServerSideProps() {
//   try {
//       const tasks = await helpers.task.get.fetch();

//       return {
//           props: {
//               trcpState: helpers.dehydrate,
//               initialTasks: tasks,
//           },
//       };
//   } catch (error) {
//       console.error('Error fetching tasks:', error);
//       return {
//           props: {
//               trcpState: helpers.dehydrate,
//               initialTasks: [], 
//           },
//       };
//   }
// }
// props: InferGetServerSidePropsType<typeof getServerSideProps>


export default async function Home() {

  const initialTasks = await helpers.task.get.fetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <TaskList initialTasks={initialTasks}/>
        </div>
      </main>
    </HydrateClient>
  );
}
