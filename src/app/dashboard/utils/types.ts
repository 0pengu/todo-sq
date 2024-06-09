import moment from "moment";
import { z } from "zod";

export interface Todo {
  completed: boolean;
  content: string | null;
  created_at: string;
  discord_id: string;
  due_date: string;
  id: string;
  sent: boolean;
  is_deleted?: boolean | null;
}

export const todoSchema = z.object({
  todoName: z
    .string({
      invalid_type_error: "Todo name must be a string",
      required_error: "Todo name is required",
    })
    .min(1, "Todo name must be at least 1 character long")
    .max(1000, "Todo name must be at most 1000 characters long"),
  discord_id: z
    .string({
      invalid_type_error: "Discord ID must be a string",
      required_error: "Discord ID is required",
    })
    .optional(),
  todoDate: z
    .string({
      invalid_type_error: "Due date must be a string",
      required_error: "Due date is required",
    })
    .refine(
      (date) =>
        moment(date, moment.ISO_8601, true).isValid() &&
        moment(date).isAfter(moment()),
      {
        message:
          "Due date must be a valid ISO 8601 date and must be in the future",
      }
    ),
});

export const idSchema = z.object({
  todoId: z
    .string({
      invalid_type_error: "Todo ID must be a string",
      required_error: "Todo ID is required",
    })
    .uuid("Todo ID must be a valid UUID"),
});

export const editTodoSchema = z.object({
  discord_id: z
    .string({
      invalid_type_error: "Discord ID must be a string",
      required_error: "Discord ID is required",
    })
    .optional(),
  content: z
    .string({
      invalid_type_error: "Todo name must be a string",
      required_error: "Todo name is required",
    })
    .min(1, "Todo name must be at least 1 character long")
    .max(1000, "Todo name must be at most 1000 characters long"),
  due_date: z
    .string({
      invalid_type_error: "Due date must be a string",
      required_error: "Due date is required",
    })
    .refine(
      (date) =>
        moment(date, moment.ISO_8601, true).isValid() &&
        moment(date).isAfter(moment()),
      {
        message:
          "Due date must be a valid ISO 8601 date and must be in the future",
      }
    ),
});

export type todoSchemaType = z.infer<typeof todoSchema>;

export type idSchemaType = z.infer<typeof idSchema>;

export type editTodoSchemaType = z.infer<typeof editTodoSchema>;
