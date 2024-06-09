"use server";

import { createClient } from "@/utils/supabase/server";
import moment from "moment";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from "@internationalized/date";
import { Todo } from "./utils/types";
import { v4 } from "uuid";

export default async function SubmitTodo(formData: FormData) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const discordId = data.user.identities && data.user.identities[0].id;

  console.log(discordId);

  if (!discordId) {
    redirect("/login");
  }

  const rawFormData = {
    todoName: formData.get("todoName")?.toString(),
    todoDate: parseZonedDateTime(
      formData.get("todoDate")?.toString() || ""
    ).toAbsoluteString(),
  };

  if (!rawFormData.todoName || !rawFormData.todoDate) {
    return;
  }

  console.log(rawFormData);

  const dataToUpload = {
    discord_id: discordId,
    content: rawFormData.todoName,
    due_date: moment(rawFormData.todoDate).utc().format(),
    created_at: moment().utc().format(),
  };

  const returns = await supabase.from("todos").insert(dataToUpload);
  console.log(returns);

  return returns.data;
}

export async function editTodo(formData: FormData) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const discordId = data.user.identities && data.user.identities[0].id;

  if (!discordId) {
    redirect("/login");
  }

  const todoId = formData.get("todoId")?.toString();

  if (!todoId) {
    return;
  }

  const rawFormData = {
    discord_id: discordId,
    content: formData.get("todoName")?.toString(),
    due_date: parseZonedDateTime(
      formData.get("todoDate")?.toString() || ""
    ).toAbsoluteString(),
  };

  if (!rawFormData.content || !rawFormData.due_date) {
    return;
  }

  const returns = await supabase
    .from("todos")
    .update(rawFormData)
    .eq("id", todoId);

  console.log(returns);

  return returns.data;
}

export async function DeleteTodo(formData: FormData) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const discordId = data.user.identities && data.user.identities[0].id;

  if (!discordId) {
    redirect("/login");
  }

  const todoId = formData.get("todoId")?.toString();
  if (!todoId) {
    return;
  }

  const returns = await supabase
    .from("todos")
    .update({ is_deleted: true })
    .eq("id", todoId);

  console.log(returns);

  return returns.data;
}

export async function testTodo(formData: FormData) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const discordId = data.user.identities && data.user.identities[0].id;

  if (!discordId) {
    redirect("/login");
  }

  const firstTodo: Todo = {
    id: v4(),
    content: "Breathe",
    created_at: moment().utc().format(),
    due_date: moment(
      parseZonedDateTime(
        now(getLocalTimeZone()).subtract({ days: 1 }).toString()
      ).toAbsoluteString()
    )
      .utc()
      .format(),
    completed: false,
    sent: false,
    discord_id: discordId,
  };

  const returns = await supabase.from("todos").insert(firstTodo);

  console.log(returns);

  return returns.data;
}
