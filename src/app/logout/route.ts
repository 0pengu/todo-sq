import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error.message);
    return false;
  }
  return true;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const status = await signOut();
  if (status) {
    return NextResponse.redirect(`${origin}/`);
  }
  return;
}
