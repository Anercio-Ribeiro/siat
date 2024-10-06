import Link from "next/link";
import Image from "next/image";
import { PanelsTopLeft } from "lucide-react";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import LoginForm from "./auth/page";


export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
     
    <LoginForm/>
    </div>
  );
}
