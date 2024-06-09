"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { getURL } from "@/utils/getUrl";

export async function signIn() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${getURL()}auth/callback`,
    },
  });

  if (error) {
    console.error("OAuth error:", error.message);
    return;
  }

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}
