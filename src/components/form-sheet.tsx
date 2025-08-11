import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import BookingForm from "./booking-form";

const FormSheet = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="gap-2 px-4 flex items-center justify-end">
            <Button className="rounded-full bg-[#10715A] hover:bg-[#10715A]/90 text-white">
              Create Activity
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              <span className="text-2xl text-[#10715A]">Book Court,</span>
              <span className="text-xs text-[#10715A]"> Wed Jul 30, 2025</span>
            </SheetTitle>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            {/* Form */}

            <BookingForm />
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-username">Username</Label>
              <Input id="sheet-demo-username" defaultValue="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FormSheet;
