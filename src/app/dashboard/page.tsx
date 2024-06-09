import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Dashboard from "./components/Dashboard";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const discordId = data.user.identities && data.user.identities[0].id;

  if (!discordId) {
    redirect("/login");
  }

  const { data: todos, error: todosError } = await supabase
    .from("todos")
    .select("*")
    .eq("discord_id", discordId)
    .eq("is_deleted", false);

  if (todosError) {
    redirect("/login");
  }

  // Sort todos by due_date from soonest to latest
  const sortedTodos = todos.sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    return a.completed ? 1 : -1;
  });

  return <Dashboard serverTodos={sortedTodos} discordId={discordId} />;
}
