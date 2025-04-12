"use client";
import { useState, useEffect } from "react";
import { PageWithBreadcrumb } from "../../../components/PageWithBreadcrumb";
import { useUser } from "@/hooks/getUser";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import RentalListings from "@/components/house-components/rental-lists";
import RentalTenantListings from '../../../components/house-components/rental-inquilino-list';


export default function AgendamentoPage() {
  return (
  <PageWithBreadcrumb
  title="Agendamentos"
  breadcrumbItems={[
    { label: "Início", href: "/" },
    { label: "Agendamento" },
  ]}
>

  <RentalListings />
  {/* <RentalTenantListings/> */}
 
</PageWithBreadcrumb>
  );
  
}