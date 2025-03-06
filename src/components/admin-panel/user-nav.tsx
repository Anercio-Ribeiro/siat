
// "use client";

// import Link from "next/link";
// import { LayoutGrid, LogOut, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
//   TooltipProvider,
// } from "@/components/ui/tooltip";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { getUser } from "@/lib/lucia";
// import { redirect } from "next/navigation";
// import React from "react";

// export function UserNav() {
//   return (
//     <DropdownMenu>
//       <TooltipProvider disableHoverableContent>
//         <Tooltip delayDuration={100}>
//           <TooltipTrigger asChild>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="relative h-8 w-8 rounded-full"
//               >
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src="#" alt="Avatar" />
//                   <AvatarFallback className="bg-transparent">
//                     {/* {user.nome.charAt(0).toUpperCase()} */}
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//           </TooltipTrigger>
//           <TooltipContent side="bottom">Profile</TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       <DropdownMenuContent className="w-56" align="end" forceMount>
//         <DropdownMenuLabel className="font-normal">
//           <div className="flex flex-col space-y-1">
//             <p className="text-sm font-medium leading-none">
//               {/* {user.nome} */}
//               </p>
//             <p className="text-xs leading-none text-muted-foreground">
//               {/* {user.email} */}
//             </p>
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           <DropdownMenuItem className="hover:cursor-pointer" asChild>
//             <Link href="/dashboard" className="flex items-center">
//               <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
//               Dashboard
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuItem className="hover:cursor-pointer" asChild>
//             <Link href="/account" className="flex items-center">
//               <User className="w-4 h-4 mr-3 text-muted-foreground" />
//               Account
//             </Link>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {}}>
//           <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
//           Sign out
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };


// components/UserNav.js
// "use client";

// import Link from "next/link";
// import { LayoutGrid, LogOut, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
//   TooltipProvider,
// } from "@/components/ui/tooltip";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useUser } from "@/hooks/getUser"; // Importe o hook aqui

// export function UserNav() {
//   const { user, loading } = useUser();

//   if (loading) return <p>Loading...</p>; // Exibe um loading enquanto carrega o usuário
//   if (!user) return null; // Retorna nulo se o usuário não está logado

//   return (
//     <DropdownMenu>
//       <TooltipProvider disableHoverableContent>
//         <Tooltip delayDuration={100}>
//           <TooltipTrigger asChild>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="relative h-8 w-8 rounded-full"
//               >
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={user.picture || "#"} alt="Avatar" />
//                   <AvatarFallback className="bg-transparent">
//                     {user.nome?.charAt(0).toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//           </TooltipTrigger>
//           <TooltipContent side="bottom">Profile</TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       <DropdownMenuContent className="w-56" align="end" forceMount>
//         <DropdownMenuLabel className="font-normal">
//           <div className="flex flex-col space-y-1">
//             <p className="text-sm font-medium leading-none">
//               {user.nome}
//             </p>
//             <p className="text-xs leading-none text-muted-foreground">
//               {user.email}
//             </p>
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           <DropdownMenuItem className="hover:cursor-pointer" asChild>
//             <Link href="/dashboard" className="flex items-center">
//               <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
//               Dashboard
//             </Link>
//           </DropdownMenuItem>
//           <DropdownMenuItem className="hover:cursor-pointer" asChild>
//             <Link href="/account" className="flex items-center">
//               <User className="w-4 h-4 mr-3 text-muted-foreground" />
//               Account
//             </Link>
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem
//           className="hover:cursor-pointer"
//           onClick={() => {
//             // handle sign out here
//           }}
//         >
//           <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
//           Sign out
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }


// components/UserNav.tsx
"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, User as UserIcon } from "lucide-react";
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


export function UserNav() {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>; // Exibe um loading enquanto carrega o usuário
  if (!user) return null; // Retorna nulo se o usuário não está logado

  console.log(user);

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage src={user.picture || "#"} alt="Avatar" /> */}
                  <AvatarFallback className="bg-transparent">
                    {user.nome}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.nome}
            </p>
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
              Account  {user.email}
            </Link>
            
            
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Link href="/account" className="flex items-center">
              <UserIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                {user.email}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {
          <SignOutButton>
            <LogOut  className="w-4 h-4 mr-3 text-muted-foreground" />
            Sair
            </SignOutButton>
        }}>
           <SignOutButton>
           <LogOut  className="w-4 h-4 mr-3 text-muted-foreground" />
            Sair
            </SignOutButton>
    
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

