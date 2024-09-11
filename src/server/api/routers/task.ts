import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

const idSchema = z.object({
  id: z.number()
})

const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
})

export const tasksRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.db.task.findMany()
    return tasks ?? null;
  }),
  create: publicProcedure
    .input(taskSchema)
    .mutation(async ({ ctx, input}) => {
      return ctx.db.task.create({
        data: {
            title: input.title,
            description: input.description
        }
      })
    }),
    update: publicProcedure
    .input(taskSchema.merge(idSchema))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
        },
      });
    }),
    delete: publicProcedure
    .input(idSchema)
    .mutation(async ({ ctx, input}) => {
      await ctx.db.task.delete({
        where: {
          id: input.id
        }
      })
    })
})