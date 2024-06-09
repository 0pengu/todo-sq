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
    </form>
  );
}
