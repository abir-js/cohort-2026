import { z } from "zod";

const todoValidationSchema = z.object({
  id: z.string().describe("Unique identifier for the todo item"),
  title: z.string().describe("Title of the todo item"),
  description: z.string().describe("Description of the todo item").optional(),
  isCompleted: z
    .boolean()
    .default(false)
    .describe("If the todo item is completed or not"),
});

export type Todo = z.infer<typeof todoValidationSchema>;

// export interface ITodo {
//   id: string;
//   title: string;
//   description?: string;
//   isCompleted: boolean;
// }
