
"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, User as UserIcon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/getUser";
import SignOutButton from "../SignOutButton";
import { useFavorites } from "@/hooks/useFavoritos";


export function UserNav() {
  const { user, loading } = useUser();
  const { favorites } = useFavorites(); // Removed fetchFavorites

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link href="/login">Entrar</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Criar Conta</Link>
        </Button>
      </div>
    );
  }

  const favoritesCount = user.role === "INQUILINO" && favorites ? favorites.length : 0;

  return (
    <DropdownMenu>
       <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.picture || ""} alt="Avatar" />
                  <AvatarFallback className="bg-transparent">
                    {user.nome?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Perfil</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.nome}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center">
              <UserIcon className="w-4 h-4 mr-3 text-muted-foreground" />
              Conta
            </Link>
          </DropdownMenuItem>
          {user.role === "INQUILINO" && (
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link href="/lista-favoritos" className="flex items-center">
                <Heart className="w-4 h-4 mr-3 text-muted-foreground" />
                Favoritos ({favoritesCount})
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer">
          <SignOutButton>
            <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
            Sair
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}