"use client";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "./ui/separator";

const MobileSidebarTrigger = () => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile && <SidebarTrigger className="-ml-1" />}{" "}
      {isMobile && (
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
      )}
    </>
  );
};

export default MobileSidebarTrigger;
