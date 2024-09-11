import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type Task = RouterOutput['task']['get'][0]

export type TaskListProps = {
    initialTasks: Task[];
};
