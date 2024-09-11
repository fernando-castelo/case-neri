import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

const subtaskSchema = z.object({
  description: z.string().optional(),
  taskId: z.number(),
});

const idSchema = z.object({
  id: z.number(),
});

export const subtasksRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const subtasks = await ctx.db.subtask.findMany();
    return subtasks ?? null;
  }),

  create: publicProcedure
    .input(subtaskSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.subtask.create({
        data: {
          description: input.description,
          taskId: input.taskId,
        },
      });
    }),


  delete: publicProcedure
    .input(idSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.subtask.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
