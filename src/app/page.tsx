import { AppSidebar } from "@/components/app-sidebar";
import FormSheet from "@/components/form-sheet";
import MobileSidebarTrigger from "@/components/sidebar-trigger";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import UserProfile from "@/components/user-profile";
import { Bell } from "lucide-react";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header>
          <div className="flex items-center gap-2 px-4">
            <MobileSidebarTrigger />
            <div className="flex items-center justify-between w-full py-8">
              <h1 className="text-2xl font-bold text-[#124547]"> Bookings</h1>
              <div className="flex items-center gap-4">
                <Bell className="size-6 text-[#124547]" fill="#124547" />
                <UserProfile />
              </div>
            </div>
          </div>
        </header>
        <FormSheet />
      </SidebarInset>
    </SidebarProvider>
  );
}
