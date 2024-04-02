"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, LogIn } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"} className="flex gap-2 my-1">
          <Avatar>
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoggedIn ? (
          <DropdownMenuItem className="gap-2" onClick={() => signOut()}>
            <LogOut />
            Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="gap-2" onClick={() => signIn("google")}>
            <LogIn />
            Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className="container mx-auto dark:bg-gray-900 py-4 bg-gray-200 rounded-bl-xl rounded-br-xl">
      <div className="flex flex-row justify-between items-center">
        <div>
          <Link
            href="/"
            className="flex flex-row justify-start gap-4 items-center text-bold text-2xl font-mono hover:opacity-40"
          >
            <Image src="/icon.png" width="50" height="50" alt="logo" />
            BuidlBuddy
          </Link>
        </div>
        <div className="flex flex-row justify-evenly gap-8 items-center">
          <AccountDropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
