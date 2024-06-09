import { Card, CardBody, Tabs, Tab, Input, Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DiscordForm from "./components/DiscordForm";

export default async function LoginPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)]">
      <Card className=" w-[340px] ">
        <CardBody className="overflow-hidden">
          <DiscordForm />
        </CardBody>
      </Card>
    </div>
  );
}
