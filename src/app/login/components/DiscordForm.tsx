"use client";

import { Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "@/app/login/actions";
import { Link as NextUILink } from "@nextui-org/react";
import Link from "next/link";

export default function DiscordForm() {
  const [loading, setLoading] = useState(false);

  return (
    <form className="flex flex-col gap-4">
      <Button
        isLoading={loading}
        type="submit"
        className="bg-discord"
        variant="shadow"
        onPress={async (e) => {
          setLoading(true);
          await signIn();
        }}
      >
        <DiscordLogoIcon />
        Continue with Discord
      </Button>
      <Divider />
      <text className="text-center">
        Before you sign in, please authorize the bot to send you direct
        messages, by clicking{" "}
        <NextUILink
          href="javascript:window.open('https://discord.com/oauth2/authorize?client_id=1238871856896016444','mypopuptitle','width=600,height=400')"
          as={Link}
        >
          here
        </NextUILink>
        .
      </text>
    </form>
  );
}
