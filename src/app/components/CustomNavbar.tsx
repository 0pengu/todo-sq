"use client";
import "katex/dist/katex.min.css";

import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/utils/user/client/getUser";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUILink,
  Button,
  Dropdown,
  Avatar,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Divider,
  Tooltip,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import { webcrypto } from "crypto";
import Latex from "react-latex-next";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomNavbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await getUser();
      setUser(data.user);
    }
    fetchUser();
  }, []);

  return (
    <>
      <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit ">
              {"{Todo}"}
              <Latex>$^2$</Latex>
            </p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={pathname == "/"}>
            <NextUILink href="/" as={Link} aria-current="page">
              Home
            </NextUILink>
          </NavbarItem>
          {user && (
            <>
              <NavbarItem isActive={pathname == "/dashboard"}>
                <NextUILink href="/dashboard" as={Link} aria-current="page">
                  Dashboard
                </NextUILink>
              </NavbarItem>
              <Tooltip content="Coming soon...">
                <NavbarItem isActive={pathname == "/integrations"}>
                  <NextUILink
                    href="/integrations"
                    as={Link}
                    aria-current="page"
                    isDisabled
                  >
                    Integrations
                  </NextUILink>
                </NavbarItem>
              </Tooltip>
            </>
          )}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {user && user.identities && user.identities[0].identity_data ? (
              <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="primary"
                      name={user.identities[0].identity_data.full_name}
                      size="sm"
                      src={user.identities[0].identity_data.avatar_url}
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Profile Actions"
                    variant="flat"
                    disabledKeys={["profile"]}
                  >
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as:</p>
                      <p className="font-semibold">
                        {user.identities[0].identity_data.full_name}
                      </p>
                    </DropdownItem>
                    {/* <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">
                    Configurations
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem> */}
                    <DropdownItem
                      key="logout"
                      color="danger"
                      as={NextUILink}
                      href="/logout"
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarContent>
            ) : (
              <Button
                as={NextUILink}
                color="primary"
                href="/login"
                variant="flat"
              >
                Log In
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem isActive={pathname == "/"}>
            <NextUILink href="/" as={Link} aria-current="page">
              Home
            </NextUILink>
          </NavbarMenuItem>
          {user && user.identities && user.identities[0].identity_data && (
            <>
              <NavbarMenuItem isActive={pathname == "/dashboard"}>
                <NextUILink
                  href="/dashboard"
                  as={Link}
                  aria-current="page"
                  onPress={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NextUILink>
              </NavbarMenuItem>
              <Tooltip content="Coming soon...">
                <NavbarMenuItem isActive={pathname == "/integrations"}>
                  <NextUILink
                    href="/integrations"
                    as={Link}
                    aria-current="page"
                    isDisabled
                    onPress={() => setIsMenuOpen(false)}
                  >
                    Integrations
                  </NextUILink>
                </NavbarMenuItem>
              </Tooltip>
            </>
          )}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
