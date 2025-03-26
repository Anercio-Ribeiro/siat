import {
  Tag,
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  Map,
  Home,
  CalendarCheck 
} from "lucide-react";
import { User } from "@prisma/client";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

// Update the type to include undefined
export function getMenuList(pathname: string, user: User | null | undefined): Group[] {
  const baseMenu: Group[] = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/imovel",
          label: "Imóvel",
          active: pathname.includes("/imovel"),
          icon: Home,
          submenus: []
        },
        {
          href: "/proximidades",
          label: "Proximidades",
          active: pathname.includes("/proximidades"),
          icon: Map,
          submenus: []
        },
        {
          href: "/agendamentos",
          label: "Agendamentos",
          active: pathname.includes("/agendamentos"),
          icon: CalendarCheck,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];

  // If user is undefined or null, return the base menu
  if (!user) return baseMenu;

  // Filter menu based on user role
  const userRole = user.role;

  return baseMenu.map(group => {
    if (group.groupLabel === "Contents") {
      return {
        ...group,
        menus: group.menus.filter(menu => {
          // Hide "Proximidades" for INQUILINO and PROPRIETARIO
          if (menu.href === "/proximidades" && 
              (userRole === "INQUILINO" || userRole === "PROPRIETARIO")) {
            return false;
          }
          // Hide "Imóvel" for INQUILINO
          if (menu.href === "/imovel" && userRole === "INQUILINO") {
            return false;
          }
          return true;
        })
      };
    }
    return group;
  });
}