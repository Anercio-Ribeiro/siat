import {
  Tag,
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  Map,
  Home,
  CalendarCheck ,
  ListCheck,
  ScrollText
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
      groupLabel: "Gestão dos imóveis",
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
        ,
        {
          href: "/contratos",
          label: "Contratos",
          active: pathname.includes("/contratos"),
          icon: ScrollText,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Configurações",
      menus: [
        {
          href: "/utilizadores",
          label: "Gestão de utilizadores",
          active: pathname.includes("/utilizadores"),
          icon: Users,
          submenus: []
        },
        {
          href: `perfil/${user?.id}`,
          label: "Conta",
          active: pathname.includes("/perfil"),
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
    if (group.groupLabel === "Gestão dos imóveis") {
      return {
        ...group,
        menus: group.menus.filter(menu => {
          // Hide "Proximidades" for INQUILINO and PROPRIETARIO
          if (menu.href === "/proximidades" && 
              (userRole === "INQUILINO" || userRole === "PROPRIETARIO")) {
            return false;
          }
          // Hide "Imóvel" for INQUILINO and ADMIN
          if (menu.href === "/imovel" && 
              (userRole === "INQUILINO" || userRole === "ADMIN")) {
            return false;
          }
          // Hide "Agendamentos" for ADMIN
          if (menu.href === "/agendamentos" && userRole === "ADMIN") {
            return false;
          }

          if (menu.href === "/contratos" && userRole === "ADMIN") {
            return false;
          }
          return true;
        })
      };
    }
    // Add filtering for Configurações group
    if (group.groupLabel === "Configurações") {
      return {
        ...group,
        menus: group.menus.filter(menu => {
          // Show "Utilizadores" only for ADMIN
          if (menu.href === "/utilizadores" && userRole !== "ADMIN") {
            return false;
          }
          return true;
        })
      };
    }
    return group;
  });
}